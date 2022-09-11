import csv
import os
import time
import ast
import json

start_time=time.time()

num=500

# file_name='output_'+str(num)+'k.csv'
csv_file_name='output-'+str(num)+'k-fix.csv'
csv_snippet_name='output-'+str(num)+'k-snippet.csv'

file_list=[]
snippet_list=[]


with open(csv_file_name,'r',encoding='utf-8', errors='ignore') as csv_file:
    csv_reader = csv.reader(csv_file)
    
    types={}
    for line in csv_reader:
        if line[2]!="Eslint ERROR":
            error_num=0
            errors=json.loads(line[2].replace("\'","\""))
            for key in errors:
                error_num+=errors[key]
            if error_num ==0:
                file_list.append(line[0])

with open(csv_snippet_name,'r',encoding='utf-8', errors='ignore') as csv_file:
    csv_reader = csv.reader(csv_file)
    
    types={}
    for line in csv_reader:
        if line[2]!="Eslint ERROR":
            error_num=0
            errors=json.loads(line[2].replace("\'","\""))
            for key in errors:
                error_num+=errors[key]
            if error_num ==0:
                snippet_list.append(line[0])



file_not_in_snippet=[]
snippet_not_in_file=[]

for file in file_list:
    if file not in snippet_list:
        file_not_in_snippet.append(file)

for snippet in snippet_list:
    if snippet not in file_list:
        snippet_not_in_file.append(snippet)

# print(file_not_in_snippet)
# print(snippet_not_in_file)

print(len(file_list))
print(len(snippet_list))

print(len(file_not_in_snippet))
print(len(snippet_not_in_file))

# print(file_not_in_snippet)#has error when change to snippet
error_dict={}
# error_dict={
#     "no-unused-vars":0,
#     "no-undef":0,
#     "no-unused-vars&no-undef":0,
#     "eqeqeq":0,
#     "@typescript-eslint/no-unused-vars":0,
#     "Eslint ERROR":0,
# }
# with open(csv_snippet_name,'r',encoding='utf-8', errors='ignore') as csv_file:
#     csv_reader = csv.reader(csv_file)
#     for line in csv_reader:
#         if line[0] in file_not_in_snippet:
#             if line[2]!="Eslint ERROR":
#                 errors=json.loads(line[2].replace("\'","\""))
#                 if len(errors)==2:
#                     error_dict["no-unused-vars&no-undef"]+=1
#                 else:
#                     for key in errors:
#                         error_dict[key]+=1
#             else:
#                 key=line[2]
#                 if key in error_dict:
#                     error_dict[key]+=1
#                 else:
#                     error_dict[key]=1
#     print(error_dict)
# print('\n')

# error_dict={
#     "no-unused-vars":0,
#     "no-undef":0,
#     "no-unused-vars&no-undef":0,
#     "eqeqeq":0,
#     "@typescript-eslint/no-unused-vars":0,
#     "Eslint ERROR":0,
# }

error_dict={
    "no-tabs":0,
    "no-mixed-spaces-and-tabs":0,
    "double":0,
    "Eslint ERROR":0,
}

with open(csv_file_name,'r',encoding='utf-8', errors='ignore') as csv_file:
    csv_reader = csv.reader(csv_file)
    for line in csv_reader:
        if line[0] in snippet_not_in_file:
            if line[2]!="Eslint ERROR":
                errors=json.loads(line[2].replace("\'","\""))
                if len(errors)==2:
                    error_dict["double"]+=1
                else:
                    for key in errors:
                        error_dict[key]+=1
                        
            else:
                key=line[2]
                if key in error_dict:
                    error_dict[key]+=1
                else:
                    error_dict[key]=1
            print(line)
    print(error_dict)
end_time=time.time()