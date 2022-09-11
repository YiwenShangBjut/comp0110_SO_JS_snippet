import csv
import time

start_time=time.time()

base_num=0
end_num=200

num=end_num-base_num

file_name='data-full.csv'

new_file_name='data_'+str(end_num)+'k.csv'

with open(file_name,'r',encoding='utf-8') as csv_file:
    csv_reader = csv.reader(csv_file)

    with open(new_file_name,'w',encoding='utf-8',newline='') as new_file:
        csv_writer=csv.writer(new_file, delimiter=',')
        row=0
        i=0
        for line in csv_reader:
            if i<end_num*1000 and i>base_num*1000:
                csv_writer.writerow(line)
                row+=1
            i+=1
            if i>end_num*1000:
                break
        print(row)
end_time=time.time()
print('get the sample data in number of '+str((end_num-base_num)*1000)+' cost '+str(end_time-start_time)+' sec')