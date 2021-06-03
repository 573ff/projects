#include <stdio.h>
#include <string.h>
#include "dawg.h"
#include "stack.h"
#include "hashmap.h"
#include "utils.h"
#include <time.h>
#include <math.h>

/*
 * Copy this function template to construct either a DAWG or a trie 
 * based on the dictionary filename given
 * 
 * Don't forget to change the void return type of this function 
 */
 
 


vertex* construct(char *dict,int max) {
    // Instantiate either a Trie or a DAWG here
    // ...
	//printf("top\n");
    int id_count = 0;
    vertex* dawg = initialize(&id_count);
   // printf("after init\n");
	
    struct hashmap_s* const hashmap = malloc(sizeof(struct hashmap_s));
	if(hashmap == NULL){
		perror("hashmap\n");
	}
	
    hashmap_create(16384,hashmap);

	//printf("after hash\n");
    
    struct stack* pile;
    pile = new_stack(10000);
                   
    char *line = NULL;
    char previous_word[255];
    
    size_t len = 0;
    ssize_t read;
    FILE *fp;
    
    // open file 
    fp = fopen(dict, "r"); // read mode
    if (fp == NULL) {
        perror("Error while opening the file.\n");
        exit(EXIT_FAILURE);
    }
	//printf("file opened\n");

    // read file
	int counter = 0;
    while (((read = getline(&line, &len, fp)) != -1)  && (counter<max)){
		//printf("reading file\n");
        // remove newline
        size_t length = strlen(line);
        if((length > 0) && (line[length-1] == '\n'))
        {
            line[length-1] ='\0';
        }
        
        // here insert the word in the trie or in the DAWG
        // To complete ... 
        insert_dawg(line,previous_word,dawg,pile,hashmap,&id_count);
		
        
        //copy line into previous_word
		//strcpy(previous_word,line);
        //snprintf(previous_word,1024,"%s",line);
        //printf("prev_word = %s\n, curr_word = %s\n", previous_word, line);
        strcpy(previous_word,line);
		counter++;
    }

    fclose(fp);
    free(line);

    return(dawg);
}

//performance test
/*
void performance(){
	int k = 0;
	while(k<=14){
		time_t start = clock();
		construct("../dict/french-wordlist.txt",pow(2,k));
		time_t end = clock();
		printf("it took %ld microseconds\n",end-start);
		k++;
	}
}*/

int main() {
	//performance();
	//printf("main\n");
    vertex* french_dawg = construct("dict/french-wordlist.txt",1000000);
    vertex* english_dawg = construct("dict/english-wordlist.txt",1000000);
    vertex* german_dawg = construct("dict/german-wordlist.txt",10000000);



    // Here listen for user input, parse it and detect the language of the given text
    // To complete ...
    int k=0;
    char input[500];
    while(k<3) {
        printf("Write a phrase\n");
        fgets(input,500,stdin);

        int english_counter=0;
        int french_counter=0;
        int german_counter=0;
        char word[1024];
       //printf("input=%s\n",input); 
        int size=0;

        for(int i=0;input[i]!= '\0' ;i++){

            if(input[i]!=32){
                word[size]=input[i];
                size++;  
                //printf("word=%s\n",word);
            }
            else{
                word[size] = '\0';   
                size=0; 
               // printf("word = %s\n",word);
                if(search_word_dawg(french_dawg,word)==true) french_counter+=1;
                if(search_word_dawg(english_dawg,word)==true) english_counter+=1;
                if(search_word_dawg(german_dawg,word)==true) german_counter+=1;
            }
        }
       // printf("english_counter=%d\n", english_counter);
       // printf("german_counter=%d\n", german_counter);
       // printf("french_counter=%d\n", french_counter);

        
        if ((english_counter>=french_counter) && (english_counter>=german_counter)){
            
            printf("Language Detected: English\n");
        }

        else if((french_counter>=english_counter) && (french_counter>=german_counter)){
           
            printf("Language Detected: French\n");
        }
        
        else{
            
            printf("Language Detected: German\n");
        }
        k++;
    }
    
    
		

    return 0;
}
 