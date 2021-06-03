#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>
#include "utils.h"


typedef struct node node;

struct node{

	node* ptr[26];
	bool is_word;
};

//typedef node* trie;

node* initialize(){
	node* new_node = malloc(sizeof(node));
	if(new_node==NULL){
		perror("malloc\n");
		exit(EXIT_FAILURE);
	}
	new_node->is_word = false;
	for (int i=0; i < 26; i++){
		new_node->ptr[i] = NULL;
	}
	return new_node;
}


node* insert(node* base_node,char* word_to_insert){

	node* current_node = base_node;
	int index;

	for(int i=0; word_to_insert[i]!= '\0'; i++){
		index = ascii_to_index(word_to_insert[i]);
		if(current_node->ptr[index] == NULL){
			index = ascii_to_index(word_to_insert[i]);
			current_node->ptr[index] = initialize();
			current_node = current_node->ptr[index];
		}
		else{
			current_node = current_node->ptr[index];
		}
	}
	current_node->is_word=true;
	return current_node;

}

bool search_word(node* base_node,char* word_to_search){


	node* current_node = base_node;
	for(int i=0; word_to_search[i] != '\0';i++){
		int index = ascii_to_index(word_to_search[i]);
		if(current_node->ptr[index]!=NULL){
			current_node = current_node->ptr[index];	
		}
		else{
			return false;
		}

	}
	if(current_node->is_word){
		return true;
	}
	else{
		return false;
	}


}

void free_trie(node* base_node){

	free(base_node);
}

/*
int main(){

	node* base_node = initialize();

	node* current_node = insert(base_node,"house");
	if(current_node->is_word==true) printf("house=true\n");
	else printf("house=false\n");
	node* new_current_node = insert(base_node,"houser");
	if(current_node->is_word==true) printf("houser=true\n");
	else printf("houser=false\n");



	return 0;
}*/