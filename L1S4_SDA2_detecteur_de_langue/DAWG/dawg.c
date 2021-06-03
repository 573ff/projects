#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>
#include "utils.h"
#include "stack.h"
#include "hashmap.h"


#define MAX_LENGHT 1000
#define MAX_CAPACITY 10000000

typedef struct vertex vertex;

struct vertex{

	int id;
	vertex* ptr[26];
	bool is_word;
};

typedef struct arrow arrow;

struct arrow{

	int label;
	vertex* left_vertex;
	vertex* right_vertex;

};

char index_to_char(int x){

	char c = x+65;
	return c;
}

char* create_key(vertex* v,char* key){

	key[0]='\0';
	//char key[MAX_LENGHT];
	int check_final=0;

	for(int i=0;i<26;i++){
		if(v->ptr[i]==NULL){
			check_final++;
		}
	}

	if(check_final==26){
		strcat(key,"T");
	}
	else{
		strcat(key,"F");
		for(int i=0;i<26;i++){
			if(v->ptr[i]!=NULL){
				char j[2];
				j[0] = index_to_char(i);  
				j[1] = '\0';
				strcat(key,j);
				char id[MAX_LENGHT];
				snprintf(id,MAX_LENGHT,"%d",v->ptr[i]->id);
				strcat(key,id); 
	
			}
		}
	}

	return key;
}



arrow* create_arrow(vertex* left, vertex* right,int label){

	arrow* new_arrow = malloc(sizeof(arrow));
	if(new_arrow == NULL){
		perror("malloc create_arrow\n");
		exit(EXIT_FAILURE);
	}
	new_arrow->left_vertex = left;
	new_arrow->right_vertex = right;
	new_arrow->label = label;

	return new_arrow;
}

//pointer id_start gets increased each time u init a vertex

vertex* initialize(int* id_count){

	vertex* new_vertex = malloc(sizeof(vertex));
	if(new_vertex==NULL){
		perror("malloc\n");
		exit(EXIT_FAILURE);
	}
	new_vertex->is_word = false;
	for (int i=0; i < 26; i++){
		new_vertex->ptr[i] = NULL;
	}
	new_vertex->id = *id_count;
	*id_count = *id_count + 1;

	return new_vertex;
}

vertex* insert_at(vertex* start_vertex, Stack pt, char* suffixe, int* id_count){

	//printf("in insert at\n");
	arrow* a;

	vertex* current_vertex = start_vertex;
	int index;

	for(int i=0;suffixe[i]!='\0';i++){
		index = ascii_to_index(suffixe[i]);
		if(current_vertex->ptr[index]==NULL){
			current_vertex->ptr[index]=initialize(id_count);
			a = create_arrow(current_vertex,current_vertex->ptr[index],index);
			stack_push(pt,a);
			current_vertex = current_vertex->ptr[index];
			
		}
		else{
			//printf("else happened when stack not empty\n");
			current_vertex = current_vertex->ptr[index];
		}
	}
	
	//step 4
	current_vertex->is_word = true;
	//printf("exiting insert_at\n");
	return current_vertex;
}

void minimise_dawg(size_t p,Stack pt,struct hashmap_s *const hashmap){

	//printf("we are now in minimize function\n");
	size_t pt_size = stack_size(pt);
	while(pt_size>p && pt_size != 0){
		//pop the stack
		arrow* a = stack_pop(pt);
		pt_size = stack_size(pt);

		char key[MAX_LENGHT];
		create_key(a->right_vertex,key);
		int len = strlen(key);

		//verif	
		vertex* res;
		res = hashmap_get(hashmap,key,len);
		if(res != NULL){
			//connect left vertex of the arret to vertex in hashmap
			a->left_vertex->ptr[a->label] = res;
		}
		else{
			//add to hashmap 
			hashmap_put(hashmap,key,len,a->right_vertex);
		}
		
	}

	//printf("exiting minimize function\n");

}

vertex* insert_dawg(char* word,char* previous_word,vertex* root_vertex,Stack pt,
					struct hashmap_s *const hashmap,int* id_count){

	
	//int d;
	//printf("continue?");
	//scanf("%d",&d);

	//printf("previous_word = %s\n",previous_word);
	//printf("current_word = %s\n",word);

	//int size_previous_word = strlen(previous_word);
	int size_current = strlen(word);
	int size_prefix = 0;

	

	//stept 1 get prefix
	for(int i=0;i<size_current;i++){
		if(previous_word[i]==word[i]){
			size_prefix++;
		}
	}

	//printf("size_prefix = %d\n",size_prefix);

	//step 2  minimize 
	minimise_dawg(size_prefix,pt,hashmap); 
	//printf("minimise complete.\n");  


	//step3 

	char suffixe[MAX_LENGHT]; 
	int j=0;

	for(j=size_prefix;j<size_current;j++){
		suffixe[j-size_prefix] = word[j];
		//printf("char suffixe = %c\n",suffixe[j-size_prefix]);
	}

	suffixe[j-size_prefix] = '\0';

	//printf("suffixe = %s\n",suffixe);

	if(is_stack_empty(pt)==1){
		//printf("in empty stack if\n");
		return insert_at(root_vertex,pt,suffixe,id_count);
	}
	else{
		//printf("else\n");
		arrow* top = stack_peek(pt);  //last elem on the stack
		return insert_at(top->right_vertex,pt,suffixe,id_count);
	}
	
	
}


bool search_word_dawg(vertex* root_vertex,char* word_to_search){

	vertex* current_vertex = root_vertex;

	for(int i=0;word_to_search[i]!='\0';i++){
		int index = ascii_to_index(word_to_search[i]);
		if(current_vertex->ptr[index]!=NULL){
			current_vertex = current_vertex->ptr[index];
		}
		else{
			return false;
		}
	}

	if(current_vertex->is_word){
		return true;
	}
	else{
		printf("%s not a word\n", word_to_search);

		return false;
	}
}

