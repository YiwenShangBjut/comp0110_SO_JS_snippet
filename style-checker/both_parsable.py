import csv
import os
import time
import ast
import json

start_time=time.time()

num=500

csv_file_name='output-'+str(num)+'k-fix.csv'
csv_snippet_name='output-'+str(num)+'k-snippet.csv'
new_file_name='output-'+str(num)+'k-snippet-new.csv'
new_file_name2='output-'+str(num)+'k-fix-new.csv'

file_list=[]
snippet_list=[]

not_parsable_in_file=[]
not_parsable_in_snippet=[]

snippet_num=0

with open(csv_file_name,'r',encoding='utf-8', errors='ignore') as csv_file:
    csv_reader = csv.reader(csv_file)
    for line in csv_reader:
        if line[2]!="Eslint ERROR":
            file_list.append(line[0])

with open(csv_snippet_name,'r',encoding='utf-8', errors='ignore') as csv_file:
    csv_reader = csv.reader(csv_file)
    for line in csv_reader:
        if line[2]!="Eslint ERROR":
            snippet_list.append(line[0])

print(len(file_list))
print(len(snippet_list))

for file in file_list:
    if file not in snippet_list:
        not_parsable_in_snippet.append(file)

for snippet in snippet_list:
    if snippet not in file_list:
        not_parsable_in_file.append(snippet)

print(len(not_parsable_in_snippet))
print(len(not_parsable_in_file)) 
with open(csv_snippet_name,'r',encoding='utf-8', errors='ignore') as csv_file:
    with open(new_file_name,'w',encoding='utf-8',newline='') as new_file:
        csv_reader = csv.reader(csv_file)
        csv_writer=csv.writer(new_file, delimiter=',')
        for line in csv_reader:
            if line[0] in file_list and line[0] in snippet_list:
                csv_writer.writerow(line)
                snippet_num+=1
print(snippet_num)

with open(csv_file_name,'r',encoding='utf-8', errors='ignore') as csv_file:
    with open(new_file_name2,'w',encoding='utf-8',newline='') as new_file:
        csv_reader = csv.reader(csv_file)
        csv_writer=csv.writer(new_file, delimiter=',')
        for line in csv_reader:
            if line[0] in file_list and line[0] in snippet_list:
                csv_writer.writerow(line)

            



