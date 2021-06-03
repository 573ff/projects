#ifndef _TRIE_H
#define _TRIE_H

#include "trie.c"

/**
 * @fn node* initialize()
 * @param void
 * @return a new pointer of type node
 * @brief creates a new node object
 * @pre none

*/

node* initialize();


/**
 * @fn node* insert(node* base_node,char* word_to_insert);
 * @brief inserts a word into a node
 * @param node* base_node - node 
 * @param char* word_to_insert - string to be inserted inside the node
 * @return node* - the node with the string inserted
 * @pre base_node has to be initialized
 *  
*/

node* insert(node* base_node,char* word_to_insert);


/**
 * @fn bool search_word(node* base_node,char* word_to_search)
 * @brief checks if a given word exists in the node.
 * @param node* base_node - node 
 * @param char* word_to_search - word to search inside the node
 * @return a boolean value - true if the word exists, false if not
 * @pre base_node has to be initialized
*/

bool search_word(node* base_node,char* word_to_search);

void free_trie(node* base_node);

#endif