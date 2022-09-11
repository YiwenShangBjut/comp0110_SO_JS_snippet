import csv
import os
import time

start_time=time.time()

num=500

# file_name='output_'+str(num)+'k.csv'
# file_name='processed_output_'+str(num)+'k.csv'
file_name='output-'+str(num)+'k-snippet.csv'

with open(file_name,'r',encoding='utf-8', errors='ignore') as csv_file:
    csv_reader = csv.reader(csv_file)
    EE_num=0
    row_num=0
    js_num=0
    jquery_num=0
    ts_num=0
    jsx_num=0
    for line in csv_reader:
        result=line[2]
        if result=='Eslint ERROR':
            EE_num+=1
       
        if line[1] == 'standard':
            js_num+=1
        elif line[1] == 'typescript':
            ts_num+=1
        elif line[1] == 'jquery':
            jquery_num+=1
        elif line[1] == 'react':
            jsx_num+=1
        row_num+=1
        

end_time=time.time()
print('file '+file_name+' has '+str(EE_num)+' num of Eslint ERROR, which is '+str(EE_num/row_num) +' '+str(EE_num))
print('js: '+str(js_num))
print('jquery: '+str(jquery_num))
print('ts: '+str(ts_num))
print('jsx: '+str(jsx_num))