#ifndef _DAWG_H
#define _DAWG_H

#include "dawg.c"

/**
 * @fn char index_to_char(int x)
 * @brief takes an int and transforms it into a char
 * @param int x 
 * @return char
*/
char index_to_char(int x);

/**
 * @fn char* create_key(vertex* v,char* key)
 * @brief creates a key for the dawg
 * @param vertex* v the vertex where the key will be added
 * @return char* key the key 
*/

char* create_key(vertex* v,char* key);

/**
 * @fn arrow* create_arrow(vertex* left, vertex* right,int label)
 * @brief creates a connecting arrow between two vertices
 * @param vertex* left 
 * @param vertex* right
 * @param int label is the label of the arrow
 * @return the arrow created
*/

arrow* create_arrow(vertex* left, vertex* right,int label);

/**
 * @fn vertex* initialize(int* id_count)
 * @brief 
 * @param int* id_count 
 * @return a new vertex
*/

vertex* initialize(int* id_count);


/**
 * @fn vertex* insert_at(vertex* start_vertex, Stack pt, char* suffixe, int* id_count)
 * @param vertex* start_vertex
 * @param Stack pt
 * @param char* suffixe
 * @param int* id_count
 * @return a vertex
*/

vertex* insert_at(vertex* start_vertex, Stack pt, char* suffixe, int* id_count);

/**
 * @fn void minimise_dawg(int p,Stack pt,struct hashmap_s *const hashmap);
 * @brief minimises the dawg corresponding to the description in the pdf
 * @param int p
 * @param Stack pt
 * @param struct hashmap_s *const hashmap
*/

void minimise_dawg(size_t p,Stack pt,struct hashmap_s *const hashmap);

/**
 * @fn vertex* insert_dawg(char* word,char* previous_word,vertex* root_vertex,Stack pt,
					struct hashmap_s *const hashmap,int* id_count)
 * @brief inserts into the dawg as explained in the pdf
 * @param char* word word to insert
 * @param char* previous_word to compare prefix with for minimising
 * @param vertex* root_vertex
 * @param Stack pt
 * @param struct hashmap_s *const hashmap
 * @param int* id_count
*/

vertex* insert_dawg(char* word,char* previous_word,vertex* root_vertex,Stack pt,
					struct hashmap_s *const hashmap,int* id_count);


/**
 * @fn bool search_word_dawg(vertex* root_vertex,char* word_to_search);
 * @brief checks if a given word exists in the node.
 * @param vertex* root_vertex 
 * @param char* word_to_search - word to search inside the node
 * @return a boolean value - true if the word exists, false if not
*/

bool search_word_dawg(vertex* root_vertex,char* word_to_search);


#endif	