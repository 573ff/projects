#include <stdio.h>
#include <string.h>

#include "utils.h"
#include "trie.h"

/*
 * Copy this function template to construct either a DAWG or a trie 
 * based on the dictionary filename given
 * 
 * Don't forget to change the void return type of this function 
 */

node* construct(char *dict) {
    // Instantiate either a Trie or a DAWG here
    // ...

    node* base_node = initialize();

    char *line = NULL;
    size_t len = 0;
    ssize_t read;
    FILE *fp;

    
    // open file 
    fp = fopen(dict, "r"); // read mode
    if (fp == NULL) {
        perror("Error while opening the file.\n");
        exit(EXIT_FAILURE);
    }

    // read file
    while ((read = getline(&line, &len, fp)) != -1) {
        // remove newline
        size_t length = strlen(line);
        if((length > 0) && (line[length-1] == '\n'))
        {
            line[length-1] ='\0';
        }
        
        // here insert the word in the trie or in the DAWG
        // To complete ... 
        insert(base_node,line);
    }

    fclose(fp);
    free(line);
    // return ...;
    return base_node;
}

int main() {
    node* french = construct("dict/french-wordlist.txt");
    node* english = construct("dict/english-wordlist.txt");
    node* german = construct("dict/german-wordlist.txt");

    // Here listen for user input, parse it and detect the language of the given text
    // To complete ...

    char input[500];
    int k=0;
    while(k<3) {
        printf("Write a phrase\n");
        fgets(input,500,stdin);

        int english_counter=0;
        int french_counter=0;
        int german_counter=0;
        char word[50];
        //printf("input=%s\n",input); 
        int size=0;

        for(int i=0;input[i]!='\0';i++){

            if(input[i]!=32){
                word[size]=input[i];
                size++;  
                //printf("word=%s\n",word);
            }
            else{
                word[size] = '\0';   
                size=0; 
               // printf("word = %s\n",word);
                if(search_word(french,word)==true) french_counter+=1;
                if(search_word(english,word)==true) english_counter+=1;
                if(search_word(german,word)==true) german_counter+=1;
            }
        }
        //printf("english_counter=%d\n", english_counter);
        //printf("german_counter=%d\n", german_counter);
        //printf("french_counter=%d\n", french_counter);

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
    
    free(french);
    free(english);
    free(german);


    return 0;
}