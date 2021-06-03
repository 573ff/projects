			#*******************************************************#
			#							#
			#	     VALIDATE AND GENERATE A BANK CARD 		#
			#			MIPS CODE 			#
			#	PATRASCAN MARIA STEFANIA & CLEMENTINE BOUCHARD	#
			#							#
			#*******************************************************#
			

#************************************************************************************************************************************************#
#	Brief Descritption 															 #
#																		 #
#	In this .s file you will find:														 #
#	-a menu which lets the user choose between 3 options:											 #
#		1. validate a card														 #
#		2. generate a card 													         #
#		3. exit the programm														 #	 
#	1. the validate menu option loads messages on the screen and eventually asks the user to enter the lenght and			         #
#	   the card number he wants to validate. 											         #
#	   Once that is done a message will be shown on the screen depending on the result 							 #
#	   Then the code takes the user back to the menu asking again what his choice is. 							 #
#	2. the generate option asks the user which type of card he wants to generate and depending on his choice there will be 			 #
#	   one card number shown on the screen 													 #
#	3. the last option simply quits the programm safely with the 10 system call.								 #
#																		 #
#	The validate option works with the validate_card function. 										 #
#	First this option asks the user for a size then initializes with the enter_array function the to_validate array with user input. 	 #
#	Secondly the validate_card function takes the size and the array and does all the steps of the mod10 algorithm. 			 #
#	This function works with a copy of the initial array which is stored in to_copy with the help of the copy_card function			 #
#	The result of the validate_card function will be stored in $v0 and depending on that value a message will be shown on the screen.	 #
#																		 #
#	The generate option goes to the generate par of the code and initializes the to_generate array with random numbers between 0 and 9 	 #
#	included. Then it copies the newly generated number in to_copy after which it calls the validate_card function. 			 #
#																		 #
#																	         #
#************************************************************************************************************************************************#
	
.data	

							# ASCIIZ #
							
		# MENU TEXT #
	
	welcome: 	.asciiz "\t Welcome to our bank card verifier and generator ! \n\t MENU\n" 
	option1: 	.asciiz "\t* If you want to verify whether your card is valid press 1 (one) \n" 
	option2: 	.asciiz "\t** If you want to generate a new valid bank card number press 2 (two) \n" 
	option3: 	.asciiz "\t*** If you want to quit press 3 (three) \n" 
	unknown: 	.asciiz "\t###### Unknown key.#####\n\t Please enter 1 2 or 3 \n"
	op1_enter:	.asciiz "\t* You are now in verify mode. \n" 
	op2_enter: 	.asciiz "\t** You are now in generate mode. \n"
	op3_enter:	.asciiz "\t*** QUITING PROGRAM.\n\t DONE\n\t SEE YOU NEXT TIME.\n"
	
	
		# OPTION 1 TEXT # 
		
	op1_card_size:    .asciiz "\t* Please enter the size of your card here: \n" 
	op1_card_enter:   .asciiz "\t* Please enter your card number here: \n" 
	op1_card_valid:   .asciiz "\t* Your card number is valid :) \n" 
	op1_card_invalid: .asciiz "\t* Your card number is invalid :( \n"
	op1_letters:	  .asciiz "\t* Card number cannot contain letters. Please enter a digit only card number.\n"
	
	
		# OPTION 2 TEXT # 
		
	op2_card_type:    .asciiz "\t** Choose a card type from the list below: \n" 
	op2_card_options: .asciiz "\t~~~ 1.American Express \n\t~~~ 2.Diners Club - International \n\t~~~ 3.Discover \n\t~~~ 4.InstaPayment \n\t~~~ 5.JCB \n\t~~~ 6.Maestro \n\t~~~ 7.MasterCard \n\t~~~ 8.Visa \n\t~~~ 9.Visa Electron \n"
	op2_invalid_entry:.asciiz "\t** The card type you enetered is not valid. Please enter a valid card type.\n"	
	op2_new_generated: .asciiz "\t** The new bank card number is: \n"
		
		
		# CHARACTERS # 
	space: .asciiz " "
	newline: .asciiz "\n"


							# SPACE # 
			
			.align 2		
			
	to_validate: 	.space 80
			.align 2
	to_generate:	.space 80
			.align 2
	to_copy:	.space 80
	
	
.text

	#***************#
	#		#
	#     MENU 	#
	#		#
	#***************#

	#Loading all menu messages to print
	
menu:
	la $a0 welcome
	li $v0 4 
	syscall
menu_start:
	la $a0 option1
	li $v0 4
	syscall
	
	la $a0 option2
	li $v0 4
	syscall
	
	la $a0 option3
	li $v0 4
	syscall
	
menu_option:
	# Getting the menu option 
	li $v0 5
	syscall
	move $t0 $v0 

imput_test:

	li $t1 1
	li $t2 2
	li $t3 3
	
	beq $t0 $t1 IMPUT_CARD
	beq $t0 $t2 GENERATE
	beq $t0 $t3 EXIT
	
	bgt $t0 $t3 error 
	error:
		la $a0 unknown
		li $v0 4
		syscall
		b menu_option
	
	

	
	
		# OPTION 1 #
		IMPUT_CARD:
		
			la $a0 op1_enter
			li $v0 4
			syscall
			
			#Asking card size 
			
			la $a0 op1_card_size
			li $v0 4
			syscall
			
			li $v0 5
			syscall
			
			move $s0 $v0 	#$s0 keeps the size of the card number 
			
			#Asking to enter the card number 
			
			la $a0 op1_card_enter 
			li $v0 4
			syscall
			
			move $a0 $s0 
			la $a1 to_validate
			jal enter_card
			
			move $a0 $s0 
			la $a1 to_validate
			jal copy_card
			
			la $s2 to_copy
			
			move $a0 $s0
			move $a1 $s2
			jal validate_card
			
			
			li $t1 1
			beq $v0 $zero invalid
			beq $v0 $t1 valid
			
			invalid:
				la $a0 op1_card_invalid
				li $v0 4
				syscall
				j menu_start
			
			valid:
				la $a0 op1_card_valid
				li $v0 4
				syscall
				j menu_start
			
		
		# OPTION 2 #
		GENERATE:
			
			la $a0 op2_enter
			li $v0 4
			syscall
			
			#Asking which card type to generate
			
			la $a0 op2_card_type
			li $v0 4
			syscall
			
			la $a0 op2_card_options
			li $v0 4
			syscall
			
		generate_input_type:
			li $v0 5
			syscall
			move $s0 $v0 	#contains the number of the card type 
			
				
			li $t0 1 
			li $t1 2
			li $t2 3 
			li $t3 4
			li $t4 5
			li $t5 6
			li $t6 7
			li $t7 8
			li $s7 9

			
			beq $s0 $t0 gen_AE
			beq $s0 $t1 gen_DCI
			beq $s0 $t2 gen_DISCOVER
			beq $s0 $t3 gen_InstaPayment
			beq $s0 $t4 gen_JCB
			beq $s0 $t5 gen_Maestro
			beq $s0 $t6 gen_MasterCard
			beq $s0 $t7 gen_Visa
			beq $s0 $s7 gen_VisaElectron
			
			bgt $s0 $s7 error_type_card
			blez $s0 error_type_card
			
			
			gen_AE: j generate_AE
			gen_DCI: j generate_DCI	
			gen_DISCOVER: j generate_DISCOVER
			gen_InstaPayment: j generate_InstaPayment
			gen_JCB: j generate_JCB
			gen_Maestro: j generate_Maestro
			gen_MasterCard: j generate_MasterCard
			gen_Visa: j generate_Visa
			gen_VisaElectron: j generate_VisaElectron
				
			error_type_card:
				la $a0 op2_invalid_entry
				li $v0 4
				syscall
				b GENERATE
			
			
			
			
			
			
			
			
			
			
			
			

			
			#*********************************************************************************#
			#										  #	
			# Function: enter_card 								  #
			#	   - description: initializes an array of a given size with user imout    #
			#	   - arguments:  - $a0 size of array 					  #
			#	   		 - $a1 adress of array					  #
			#	   - return: void 							  #
			#										  #
			#*********************************************************************************#
			
			enter_card:
			
			
# PROLOGUE # 
			
addi $sp $sp -28
sw $ra  24($sp)
sw $t0  20($sp)
sw $t1  16($sp)
sw $t4  12($sp)
sw $a0  8($sp)
sw $a1  4($sp)
sw $s0  0($sp)
				
				li $t0 0
				li $t1 0
				li $t4 4
				
				move $s0 $a0
				move $s1 $a1
					
			loop_enter_card:
			
				bge $t0 $s0 enter_card_exit
				
				mul $t1 $t0 $t4 
				add $t1 $t1 $s1 
				
				li $v0 5
				syscall
				
				sw $v0 0($t1) 
				
				addi $t0 $t0 1 
				
				b loop_enter_card 
				
				
enter_card_exit:
			
# EPILOGUE #
lw $ra  24($sp)
lw $t0  20($sp)
lw $t1  16($sp)
lw $t4  12($sp)
lw $a0  8($sp)
lw $a1  4($sp)
lw $s0  0($sp)
addi $sp $sp 28
jr $ra			
			
	
			#*********************************************************************************#
			#										  #	
			# Function: copy_card								  #
			#	   - description: copies an array into another			          #
			#	   - arguments:  - $a0 size of array 					  #
			#	   		 - $a1 adress of array					  #
			#	   -data:      								  #
			#		-$s2 is the adress of the copy     				  #
			#	   - return: void 							  #
			#										  #
			#*********************************************************************************#
			
			
			copy_card:
				
#PRLOGUE COPY 
addi $sp $sp -44
sw $ra 40($sp) 
sw $a0 36($sp)
sw $a1 32($sp) 
sw $t0 28($sp)
sw $t1 24($sp)
sw $t2 20($sp) 
sw $t3 16($sp) 
sw $t4 12($sp)
sw $s0 8($sp)
sw $s1 4($sp)
sw $s2 0($sp)		

				#Preparing the arguments 
				
				move $s0 $a0
				move $s1 $a1
				la $s2 to_copy
				
				li $t0 0
				li $t4 4
				li $t3 0
				li $t1 0
				li $t2 0
		
				loop_copy:
	
					bge $t0 $s0 copy_card_exit
		
					mul $t1 $t0 $t4 
					add $t1 $t1 $s1
		
					lw $t3 0($t1) 
		
		
					mul $t2 $t0 $t4
					add $t2 $t2 $s2
		
					sw $t3 0($t2)
		
					addi $t0 $t0 1
		
					b loop_copy
		
#EPILOGUE COPY 
copy_card_exit:
lw $ra 40($sp) 
lw $a0 36($sp)
lw $a1 32($sp) 
lw $t0 28($sp)
lw $t1 24($sp)
lw $t2 20($sp) 
lw $t3 16($sp) 
lw $t4 12($sp)
lw $s0 8($sp)
lw $s1 4($sp)
lw $s2 0($sp)
addi $sp $sp 44
jr $ra


			#*********************************************************************************#
			#										  #	
			#	              Description of mod10 Algorithm 			          #	
			#									          #
			#	Step 1: Omit the last digit of the card 	   			  #
			#	Step 2: Invert the order of the digits					  #
			#	Step 3: Multiply by two the digits which have an even index		  #
			#	Step 4: Substract 9 to all numbers strictly superior to 9 		  #
			#	Step 5: Summ all the digits						  #
			#	Step 6: Divide the summ by 10 and get the rest				  #
			#	Step 7: Substract 10 to the rest					  #
			# 	Result: step 7 == step 1 then the card is valid 			  #
			#										  #
			#*********************************************************************************#	
	
				
			#*********************************************************************************#
			#										  #	
			# Function: validate_card							  #
			#	   - description: checks if a card number is valid			  #
			#			   -mod10 algorithm				          #	
			#	   - arguments:  - $a0 size of array 					  #
			#	   		 - $a1 adress of array					  #
			#	   -data: $s5 contains the last digit    				  #
			#		  $t3 contains the sum 					          #					    				  #
			#	          $s4 contains 10 % %t3						  #
			#	          $s6 conatins 10 - $s4						  #
			#		  in function only:				 		  #
			#		  $s3 = size of card (-1 bc except last digit)		          #
			#	      	  $s2 = adress of card 						  #			
			#	   - return: 1 if card is valid						  #
			#		     0 if card is invalid					  #
			#										  #
			#*********************************************************************************#
	
			
			validate_card:
			
#*****
# PROLOGUE
#*****

addi $sp $sp -64
sw $ra 60($sp)
sw $a0 56($sp)
sw $a1 52($sp) 
sw $s0 48($sp)
sw $s1 44($sp)
sw $s2 40($sp)
sw $s3 36($sp)
sw $s4 32($sp) 
sw $s5 28($sp)  
sw $s6 24($sp)
sw $t0 20($sp)
sw $t1 16($sp)  
sw $t2 12($sp)  
sw $t3 8($sp)  
sw $t4 4($sp) 
sw $t5 0($sp)  
 

	move $s2 $a1	#moving into $s2  the adress of the array/card 
	
	move $s0 $a0	#s0 is the size of the array 
	move $t0 $s0 
	addi $t0 $t0 -1 
	move $s3 $t0	#moving into $s3 the size -1 of the array/card
	
	

	
	# Getting the last digit into $s5
	step1:
		li $t0 0 
		li $t4 4 
		li $t2 0
		
		addi $t2 $s0 -1 	# size - 1
		mul $t0 $t2 $t4 
		add $t0 $t0 $s2 
		
		
		lw $s5 0($t0) 		
		
	# Inverting the digits
		
	step2:
		move $t0 $s3 	
		addi $t0 $t0 -1		#size array -1
	 	li $t1 0 
	 	li $t4 4
	 	
	
	 	
	 loop_invert:
	 	bge $t1 $t0 step3
	 	
	 	mul $t2 $t1 $t4
	 	add $t2 $t2 $s2 
	 	
	 	lw $t3 0($t2) 
	 	
	 	mul $t5 $t0 $t4 
	 	add $t5 $t5 $s2 
	 	
	 	lw $t6 0($t5)
	 	
	 	sw $t3 0($t5) 
	 	sw $t6 0($t2) 
	 	
	 	addi $t1 $t1 1
	 	addi $t0 $t0 -1
	 	
	 	b loop_invert
 
	 	
	 #Multiplying by 2 the digits which have an even index (because starts at 0)
	 
	 step3: 
	
	 	
	 	li $t0 0 
	 	li $t2 2 
	 	li $t4 4 
	 	li $t1 0
	 	
	 loop_times2:
	 
	 	bge $t0 $s3 step4
	 
	 	mul $t3 $t0 $t4 
	 	add $t3 $t3 $s2 
	 	
	 	lw $t5 0($t3)
	 	
	 	mul $t5 $t5 $t2 
	 	
	 	sw $t5 0($t3)
	 	
	 	addi $t0 $t0 2
	 	b loop_times2
	 	
	 	
	 # Substract 9 
	 
	step4 :
	
		li $t0 0
		li $t1 0
		li $t4 4 
		li $t5 9 
		li $t7 0
		
	loop_sub9: 

		
		bge $t0 $s3 step5
		
		mul $t1 $t0 $t4 
		add $t1 $t1 $s2 
		
		lw $t7 0($t1) 
		
		ble $t7 $t5 do	#if > 9 ????
		
		subu $t7 $t7 $t5	#substract 9
		
		sw $t7 0($t1) 
		
	do:
		addi $t0 $t0 1 
		
		j loop_sub9
		
	#Summ the digits. Sum is in $t3
	
	step5:
	
		li $t0 0 
		li $t1 0
		li $t4 4 
		li $t3 0	#summ
		li $t5 0
		
	loop_step5:
		bge $t0 $s3 step6
		
		mul $t1 $t0 $t4
		add $t1 $t1 $s2 
		
		lw $t5 0($t1) 
		
		add $t3 $t3 $t5  
		
		addi $t0 $t0 1 
		j loop_step5 
		
	# Divide by 10 the summ and get the rest in $s4
	
	step6:

		li $t0 0 
		li $t1 10
		
		div $t3 $t1 
		mfhi $s4  		#sum modulo 10
		
		
		j step7
		
	#Substract 10 to the previous result and put it in $s6
	
	step7:

	
		li $t0 10
		
		subu $s6 $t0 $s4 	#s6 is 10-sum%10  and should be the last digit of the card 
		
		
	# Check if valid

	
		
		beq $s6 $s5 TRUE
		bne $s6 $s5 FALSE 
		
		TRUE:
			li $v0 1 
			j exit_validate_card
		
		FALSE:	
			li $v0 0
			j exit_validate_card
		
exit_validate_card:
	
#*****
# EPILOGUE
#*****	
lw $ra 60($sp)
lw $a0 56($sp)
lw $a1 52($sp) 
lw $s0 48($sp)
lw $s1 44($sp)
lw $s2 40($sp)
lw $s3 36($sp)
lw $s4 32($sp) 
lw $s5 28($sp)  
lw $s6 24($sp)
lw $t0 20($sp)
lw $t1 16($sp)  
lw $t2 12($sp)  
lw $t3 8($sp)  
lw $t4 4($sp) 
lw $t5 0($sp)  
addi $sp $sp 64
jr $ra


			
							
			#*********************************************************************************#
			#										  #	
			# Function: generate_card							  #
			#	   - description: generates a valid card number				  #
			#	   - arguments:  - $a1 size of array 					  #
			#	   - return: void 							  #
			#										  #
			#*********************************************************************************#
	
generate_AE:
	#Generate option 1: American Express
			
			
			#initializing the generate_card array with the 2 values 	
			
			la $s4 to_generate
			
			li $t0 3 	
			li $t1 4 
	
			sw $t0 0($s4) 
			sw $t1 4($s4)
	
			#loop stars at index  2 
	
			li $t0 2 
			li $t4 4 
			li $t1 0 
	
			#initialising the size of the array type american EXPRESS
	
			li $a2 15	#size
	

	loop_gen_AE:
		
		bge $t0 $a2 test_gen_AE
	
	
		mul $t1 $t0 $t4
		add $t1 $t1 $s4
	
	
		li $v0 42 
		li $a1 10
		syscall
	
		sw $a0 0($t1)

		addi $t0 $t0 1 
		j loop_gen_AE
	
	test_gen_AE:
		
		move $a0  $a2
		move $a1  $s4
		la $s2 to_copy
		
		jal copy_card
		
		move $a0 $a2
		move $a1 $s2
		jal validate_card
	
		li $t0 1
		beq $v0 $t0 print_gen_AE
		beq $v0 $zero generate_AE
	
	print_gen_AE:
		
		la $a0 op2_new_generated
		li $v0 4
		syscall
		
		move $a0 $a2
		move $a1 $s4
		jal print_card
	
		j menu_start
	
	
generate_DCI:
	#Generate option 2: Diners Club International
			
			
			#initializing the generate_card array with the 2 values 	
			
			la $s4 to_generate
			
			li $t0 3 	
			li $t1 6
	
			sw $t0 0($s4) 
			sw $t1 4($s4)
	
			#loop stars at index  2 
	
			li $t0 2 
			li $t4 4 
			li $t1 0 
	
			#initialising the size of the array type DCI
	
			li $a2 14	#size
	

	loop_gen_DCI:
		
		bge $t0 $a2 test_gen_DCI
	
	
		mul $t1 $t0 $t4
		add $t1 $t1 $s4
	
	
		li $v0 42 
		li $a1 10
		syscall
	
		sw $a0 0($t1)

		addi $t0 $t0 1 
		j loop_gen_DCI
	
	test_gen_DCI:
		
		move $a0  $a2
		move $a1  $s4
		la $s2 to_copy
		
		jal copy_card
		
		move $a0 $a2
		move $a1 $s2
		jal validate_card
	
		li $t0 1
		beq $v0 $t0 print_gen_DCI
		beq $v0 $zero generate_DCI
	
	print_gen_DCI:
		
		la $a0 op2_new_generated
		li $v0 4
		syscall
		
		move $a0 $a2
		move $a1 $s4
		jal print_card
	
		j menu_start
	
generate_DISCOVER:
	#Generate option 3: DISCOVER
			
			
			#initializing the generate_card array with the 4 values 	
			
			la $s4 to_generate
			
			li $t0 6	
			li $t1 0
			li $t2 1
			li $t3 1
	
			sw $t0 0($s4) 
			sw $t1 4($s4)
			sw $t2 8($s4)
			sw $t3 12($s4)
	
			#loop stars at index  4
	
			li $t0 4
			li $t4 4 
			li $t1 0 
	
			#initialising the size of the array type Discover
	
			li $a2 16	#size
	

	loop_gen_DISCOVER:
		
		bge $t0 $a2 test_gen_DISCOVER
	
	
		mul $t1 $t0 $t4
		add $t1 $t1 $s4
	
	
		li $v0 42 
		li $a1 10
		syscall
	
		sw $a0 0($t1)

		addi $t0 $t0 1 
		j loop_gen_DISCOVER
	
	test_gen_DISCOVER:
		
		move $a0  $a2
		move $a1  $s4
		la $s2 to_copy
		
		jal copy_card
		
		move $a0 $a2
		move $a1 $s2
		jal validate_card
	
		li $t0 1
		beq $v0 $t0 print_gen_DISCOVER
		beq $v0 $zero generate_DISCOVER
	
	print_gen_DISCOVER:
		
		la $a0 op2_new_generated
		li $v0 4
		syscall
		
		move $a0 $a2
		move $a1 $s4
		jal print_card
	
		j menu_start
	
	
generate_InstaPayment:
	#Generate option 4: InstaPayment
			
			
			#initializing the generate_card array with the 3 values 	
			
			la $s4 to_generate
			
			li $t0 6	
			li $t1 3
			li $t2 9

	
			sw $t0 0($s4) 
			sw $t1 4($s4)
			sw $t2 8($s4)
	
			#loop stars at index  3
	
			li $t0 3
			li $t4 4 
			li $t1 0 
	
			#initialising the size of the array type IP
	
			li $a2 16	#size
	

	loop_gen_IP:
		
		bge $t0 $a2 test_gen_IP
	
	
		mul $t1 $t0 $t4
		add $t1 $t1 $s4
	
	
		li $v0 42 
		li $a1 10
		syscall
	
		sw $a0 0($t1)

		addi $t0 $t0 1 
		j loop_gen_IP
	
	test_gen_IP:
		
		move $a0  $a2
		move $a1  $s4
		la $s2 to_copy
		
		jal copy_card
		
		move $a0 $a2
		move $a1 $s2
		jal validate_card
	
		li $t0 1
		beq $v0 $t0 print_gen_IP
		beq $v0 $zero generate_InstaPayment
	
	print_gen_IP:
		
		la $a0 op2_new_generated
		li $v0 4
		syscall
		
		move $a0 $a2
		move $a1 $s4
		jal print_card
	
		j menu_start
	
generate_JCB:

	#Generate option 5: JCB
			
			
			#initializing the generate_card array with the 4 values 	
			
			la $s4 to_generate
			
			li $t0 3	
			li $t1 5
			li $t2 2
			li $t3 8

	
			sw $t0 0($s4) 
			sw $t1 4($s4)
			sw $t2 8($s4)
			sw $t3 12($s4)
	
			#loop stars at index  4
	
			li $t0 4
			li $t4 4 
			li $t1 0 
	
			#initialising the size of the array type JCB
	
			li $a2 16	#size
	

	loop_gen_JCB:
		
		bge $t0 $a2 test_gen_JCB
	
	
		mul $t1 $t0 $t4
		add $t1 $t1 $s4
	
	
		li $v0 42 
		li $a1 10
		syscall
	
		sw $a0 0($t1)

		addi $t0 $t0 1 
		j loop_gen_JCB
	
	test_gen_JCB:
		
		move $a0  $a2
		move $a1  $s4
		la $s2 to_copy
		
		jal copy_card
		
		move $a0 $a2
		move $a1 $s2
		jal validate_card
	
		li $t0 1
		beq $v0 $t0 print_gen_JCB
		beq $v0 $zero generate_JCB
	
	print_gen_JCB:
		
		la $a0 op2_new_generated
		li $v0 4
		syscall
		
		move $a0 $a2
		move $a1 $s4
		jal print_card
	
		j menu_start
	
	
generate_Maestro:


	#Generate option 6: Maestro
			
			
			#initializing the generate_card array with the 4 values 	
			
			la $s4 to_generate
			
			li $t0 5	
			li $t1 0
			li $t2 1
			li $t3 8

	
			sw $t0 0($s4) 
			sw $t1 4($s4)
			sw $t2 8($s4)
			sw $t3 12($s4)
	
			#loop stars at index  4
	
			li $t0 4
			li $t4 4 
			li $t1 0 
	
			#initialising the size of the array type Maestro
	
			li $a2 16	#size
	

	loop_gen_Maestro:
		
		bge $t0 $a2 test_gen_Maestro
	
	
		mul $t1 $t0 $t4
		add $t1 $t1 $s4
	
	
		li $v0 42 
		li $a1 10
		syscall
	
		sw $a0 0($t1)

		addi $t0 $t0 1 
		j loop_gen_Maestro
	
	test_gen_Maestro:
		
		move $a0  $a2
		move $a1  $s4
		la $s2 to_copy
		
		jal copy_card
		
		move $a0 $a2
		move $a1 $s2
		jal validate_card
	
		li $t0 1
		beq $v0 $t0 print_gen_Maestro
		beq $v0 $zero generate_Maestro
	
	print_gen_Maestro:
		
		la $a0 op2_new_generated
		li $v0 4
		syscall
		
		move $a0 $a2
		move $a1 $s4
		jal print_card
	
		j menu_start
		
		
generate_MasterCard:


	#Generate option 7: MasterCard
			
			
			#initializing the generate_card array with the 2 values 	
			
			la $s4 to_generate
			
			li $t0 5	
			li $t1 1


	
			sw $t0 0($s4) 
			sw $t1 4($s4)

	
			#loop stars at index  2
	
			li $t0 2
			li $t4 4 
			li $t1 0 
	
			#initialising the size of the array type MasterCard
	
			li $a2 16	#size
	

	loop_gen_MC:
		
		bge $t0 $a2 test_gen_MC
	
	
		mul $t1 $t0 $t4
		add $t1 $t1 $s4
	
	
		li $v0 42 
		li $a1 10
		syscall
	
		sw $a0 0($t1)

		addi $t0 $t0 1 
		j loop_gen_MC
	
	test_gen_MC:
		
		move $a0  $a2
		move $a1  $s4
		la $s2 to_copy
		
		jal copy_card
		
		move $a0 $a2
		move $a1 $s2
		jal validate_card
	
		li $t0 1
		beq $v0 $t0 print_gen_MC
		beq $v0 $zero generate_MasterCard
	
	print_gen_MC:
		
		la $a0 op2_new_generated
		li $v0 4
		syscall
		
		move $a0 $a2
		move $a1 $s4
		jal print_card
	
		j menu_start
		
generate_Visa:


	#Generate option 8: Visa
			
			
			#initializing the generate_card array with the 1 value 	
			
			la $s4 to_generate
			
			li $t0 4
	
			sw $t0 0($s4) 


	
			#loop stars at index  1
	
			li $t0 1
			li $t4 4 
			li $t1 0 
	
			#initialising the size of the array type Visa
			
			li $a2 16	#size
	

	loop_gen_Visa:
		
		bge $t0 $a2 test_gen_Visa
	
	
		mul $t1 $t0 $t4
		add $t1 $t1 $s4
	
	
		li $v0 42 
		li $a1 10
		syscall
	
		sw $a0 0($t1)

		addi $t0 $t0 1 
		j loop_gen_Visa
	
	test_gen_Visa:
		
		move $a0  $a2
		move $a1  $s4
		la $s2 to_copy
		
		jal copy_card
		
		move $a0 $a2
		move $a1 $s2
		jal validate_card
	
		li $t0 1
		beq $v0 $t0 print_gen_Visa
		beq $v0 $zero generate_Visa
	
	print_gen_Visa:
		
		la $a0 op2_new_generated
		li $v0 4
		syscall
		
		move $a0 $a2
		move $a1 $s4
		jal print_card
	
		j menu_start
		
generate_VisaElectron:

	#Generate option 9: Visa Electron
			
			
			#initializing the generate_card array with the 4 values 	
			
			la $s4 to_generate
			
			li $t0 4
			li $t1 0
			li $t2 2
			li $t3 6
	
			sw $t0 0($s4) 
			sw $t1 4($s4)
			sw $t2 8($s4)
			sw $t3 12($s4)


	
			#loop stars at index  4
	
			li $t0 4
			li $t4 4 
			li $t1 0 
	
			#initialising the size of the array type Visa Electron
			
			li $a2 16	#size
	

	loop_gen_VisaElectron:
		
		bge $t0 $a2 test_gen_VisaElectron
	
	
		mul $t1 $t0 $t4
		add $t1 $t1 $s4
	
	
		li $v0 42 
		li $a1 10
		syscall
	
		sw $a0 0($t1)

		addi $t0 $t0 1 
		j loop_gen_VisaElectron
	
	test_gen_VisaElectron:
		
		move $a0  $a2
		move $a1  $s4
		la $s2 to_copy
		
		jal copy_card
		
		move $a0 $a2
		move $a1 $s2
		jal validate_card
	
		li $t0 1
		beq $v0 $t0 print_gen_VisaElectron
		beq $v0 $zero generate_VisaElectron
	
	print_gen_VisaElectron:
		
		la $a0 op2_new_generated
		li $v0 4
		syscall
		
		move $a0 $a2
		move $a1 $s4
		jal print_card
	
		j menu_start
		
		
							
			#*********************************************************************************#
			#									  	  #	
			# Function: print_card								  #
			#	   - description: prints a card number					  #
			#	   - arguments:  - $a0 size of array 					  #
			#			 - $a1 adress of array    				  #
			#	   - return: void 							  #
			#										  #
			#*********************************************************************************#
	
	
	
	
	
	
	
	
	
print_card:
 
# PROLOGUE #	

addi $sp $sp -20
sw $ra 16($sp)
sw $a0 12($sp)
sw $a1 8($sp)
sw $s0 4($sp)
sw $s1 0($sp)
		

		
		li $t0 0
		li $t1 0 
		li $t4 4 
		move $s0 $a0  # size
		move $s1 $a1  # adress	
		
	loop:
		bge $t0 $s0 exit_print_card
		
		mul $t1 $t0 $t4
		add $t1 $t1 $s1 
		
		lw $a0 0($t1) 
		
		li $v0 1 
		syscall
		
		la $a0 space 
		li $v0 4
		syscall

		
		addi $t0 $t0 1 
		b loop

exit_print_card:
la $a0 newline
li $v0 4
syscall
		
# EPILOGUE #	
lw $ra 16($sp)
lw $a0 12($sp)
lw $a1 8($sp)
lw $s0 4($sp)
lw $s1 0($sp)
addi $sp $sp 20
jr $ra
		

	
	EXIT:
		la $a0 op3_enter
		li $v0 4
		syscall
		li $v0 10
		syscall
		
	
	
	
	
	
	


	
	

		
		
	
