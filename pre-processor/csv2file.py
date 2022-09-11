import csv
import os
import time

start_time=time.time()

num=600

file_name='processed_data_'+str(num)+'k.csv'
# file_name='data_'+str(num)+'k.csv'
# file_name_original='SOTorrent_after_filter_original.csv'
path=os.getcwd()+'\\snippets_'+str(num)+'k'
# path_original=os.getcwd()+'\\snippets_test_original'

def mkdir():
    folder = os.path.exists(path)

    if not folder:
        os.makedirs(path)
    
mkdir()

with open(file_name,'r',encoding='utf-8', errors='ignore') as csv_file:
    csv_reader = csv.reader(csv_file)
    for line in csv_reader:
        post_id=line[0]
        content=line[6]
        if post_id.isnumeric():
            with open(path+'\\'+post_id+'.js','w',encoding='utf-8',newline='') as snippet_file:
                snippet_file.write(content)

# with open(file_name_original,'r',encoding='utf-8') as csv_file:
#     csv_reader = csv.reader(csv_file)
#     for line in csv_reader:
#         post_id=line[0]
#         content=line[6]
#         with open(path_original+'\\'+post_id+'.js','w',encoding='utf-8',newline='') as snippet_file:
#             snippet_file.write(content)

end_time=time.time()
print('transform csv to file in data scale of '+str(num*1000)+ ' cost '+str(end_time-start_time)+' sec')