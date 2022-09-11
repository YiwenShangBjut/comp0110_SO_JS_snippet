import csv
import os
import time
import ast
import json

start_time=time.time()

num=500

csv_js_name='output-'+str(num)+'k-js-file.csv'
csv_all_name='output-'+str(num)+'k-all-file.csv'

jquery_EE_list=[]
EE_in_js_not_in_qs=[]
EE_in_qs_not_in_js=[]
jquery_list=[]
jquery_error_list=[]
js_error_list=[]
both_error_list=[]

name_list=[]
diff_list=[]

snippet_num=0

with open(csv_all_name,'r',encoding='utf-8', errors='ignore') as csv_file:
    csv_reader = csv.reader(csv_file)
    for line in csv_reader:
        name_list.append(line[0])
        if line[2] == "Eslint ERROR" and line[1]=='jquery':
            jquery_EE_list.append(line[0])
        if line[2] != "Eslint ERROR" and line[1]=='jquery':
            jquery_list.append(line[0])

parsable_in_js=0
parsable_in_jq=0

both_parsable_js=[]
both_parsable_jq=[]
jq_num=0
with open(csv_js_name,'r',encoding='utf-8', errors='ignore') as csv_file:
    csv_reader = csv.reader(csv_file)
    for line in csv_reader:
        jq_num+=1
        if line[2]=="Eslint ERROR":
            if line[0] not in jquery_EE_list:
                EE_in_js_not_in_qs.append(line[0])
        else:
            if line[0] in jquery_EE_list:
                EE_in_qs_not_in_js.append(line[0])
        
        if line[0] not in jquery_error_list and line[0] in jquery_list and line[2]!="Eslint ERROR":
            both_error_list.append(line[0])

print('number of jquery: '+str(jq_num))
print('EE_in_js_not_in_qs: '+ str(len(EE_in_js_not_in_qs)))
print('EE_in_qs_not_in_js: '+ str(len(EE_in_qs_not_in_js)))
print('both_error_list: '+ str(len(both_error_list)))

statement_total_num=0

with open(csv_all_name,'r',encoding='utf-8', errors='ignore') as csv_file:
    csv_reader = csv.reader(csv_file)
    for line in csv_reader:
        if line[0] in both_error_list:
            errors=json.loads(line[2].replace("\'","\""))
            jquery_error_list.append(errors)
            statement_num=int(line[6].split("\"")[1])
            statement_total_num+=statement_num

with open(csv_js_name,'r',encoding='utf-8', errors='ignore') as csv_file:
    csv_reader = csv.reader(csv_file)
    for line in csv_reader:
        if line[0] in both_error_list:
            errors=json.loads(line[2].replace("\'","\""))
            js_error_list.append(errors)

not_same_error=0
for i in range(0, len(both_error_list)):
    if jquery_error_list[i] != js_error_list[i]:
        # print()
        not_same_error+=1
print(not_same_error)

error_in_js_not_in_jq={}
error_in_jq_not_in_js={}

for i in range(0, len(both_error_list)):
    js_error=js_error_list[i]
    jq_error=jquery_error_list[i]
    for error in js_error:
        if error not in jq_error:
            if error not in error_in_js_not_in_jq:
                error_in_js_not_in_jq[error]=0
            error_in_js_not_in_jq[error]+=js_error[error]
        else:
            if js_error[error] != jq_error[error]:
                if js_error[error] > jq_error[error]:
                    if error not in error_in_js_not_in_jq:
                        error_in_js_not_in_jq[error]=0
                    error_in_js_not_in_jq[error]+=js_error[error]-jq_error[error]
                else:
                    if error not in error_in_jq_not_in_js:
                        error_in_jq_not_in_js[error]=0
                    error_in_jq_not_in_js[error]+=jq_error[error]-js_error[error]
    for error in jq_error:
        if error not in js_error:
            if error not in error_in_jq_not_in_js:
                error_in_jq_not_in_js[error]=0
            error_in_jq_not_in_js[error]+=jq_error[error]
        else:
            if jq_error[error] != js_error[error]:
                if jq_error[error] > js_error[error]:
                    if error not in error_in_jq_not_in_js:
                        error_in_jq_not_in_js[error]=0
                    error_in_jq_not_in_js[error]+=jq_error[error]-js_error[error]
                else:
                    if error not in error_in_js_not_in_jq:
                        error_in_js_not_in_jq[error]=0
                    error_in_js_not_in_jq[error]+=js_error[error]-jq_error[error]
error_in_js_not_in_jq=sorted(error_in_js_not_in_jq.items(), key=lambda x: x[1], reverse=True)
error_in_jq_not_in_js=sorted(error_in_jq_not_in_js.items(), key=lambda x: x[1], reverse=True)
# print(error_in_js_not_in_jq)
# print(error_in_jq_not_in_js)
            
js_error_num=0
jq_error_num=0

for i in range(0, len(both_error_list)):
    js_error=js_error_list[i]
    jq_error=jquery_error_list[i]
    for error in js_error:
        js_error_num+=js_error[error]
    for error in jq_error:
        jq_error_num+=jq_error[error]

print(js_error_num)
print(jq_error_num)
print(statement_total_num)

error_in_js_not_in_jq_file_num={}
error_in_jq_not_in_js_file_num={}

for i in range(0, len(both_error_list)):
    js_error=js_error_list[i]
    jq_error=jquery_error_list[i]
    for error in js_error:
        if error not in jq_error:
            if error not in error_in_js_not_in_jq_file_num:
                error_in_js_not_in_jq_file_num[error]=0
            error_in_js_not_in_jq_file_num[error]+=1
        else:
            if js_error[error] != jq_error[error]:
                if js_error[error] > jq_error[error]:
                    if error not in error_in_js_not_in_jq_file_num:
                        error_in_js_not_in_jq_file_num[error]=0
                    error_in_js_not_in_jq_file_num[error]+=1
                else:
                    if error not in error_in_jq_not_in_js_file_num:
                        error_in_jq_not_in_js_file_num[error]=0
                    error_in_jq_not_in_js_file_num[error]+=1
    for error in jq_error:
        if error not in js_error:
            if error not in error_in_jq_not_in_js_file_num:
                error_in_jq_not_in_js_file_num[error]=0
            error_in_jq_not_in_js_file_num[error]+=1
        else:
            if jq_error[error] != js_error[error]:
                if jq_error[error] > js_error[error]:
                    if error not in error_in_jq_not_in_js_file_num:
                        error_in_jq_not_in_js_file_num[error]=0
                    error_in_jq_not_in_js_file_num[error]+=1
                else:
                    if error not in error_in_js_not_in_jq_file_num:
                        error_in_js_not_in_jq_file_num[error]=0
                    error_in_js_not_in_jq_file_num[error]+=1
error_in_js_not_in_jq_file_num=sorted(error_in_js_not_in_jq_file_num.items(), key=lambda x: x[1], reverse=True)
error_in_jq_not_in_js_file_num=sorted(error_in_jq_not_in_js_file_num.items(), key=lambda x: x[1], reverse=True)
print(error_in_js_not_in_jq_file_num)
print(error_in_jq_not_in_js_file_num)