import csv
import os
import time
import ast
import json

start_time=time.time()

num=500

# file_name='output_'+str(num)+'k.csv'
# csv_file_name='output-'+str(num)+'k-fix.csv'
# csv_file_name='output-'+str(num)+'k-fix-new.csv'
csv_file_name='output-'+str(num)+'k-snippet-new.csv'

snippet_folder_path='snippet-'+str(num)+'k\exact_match_snippet_'+str(num)+'k'

snippet_dict={}

# def read_snippets():
#     files=os.listdir(snippet_folder_path)
#     snippet_num=0
#     for file in files:
#         snippet_dict[file]={}
#         with open(snippet_folder_path+'\\'+file, 'r', encoding='utf-8') as snippet_file:
#             snippet_num+=1
#             snippet=snippet_file.read()


error_num_dict={}

error_statement_dict={}

scatter_data=[]

total_statement_num=0
total_error_num=0

# outlier_statement_data=[299,]
# outlier_violation_data=[2424, 785, 556, 581,476,446,349]


with open(csv_file_name,'r',encoding='utf-8', errors='ignore') as csv_file:
    csv_reader = csv.reader(csv_file)
    type_num={}
    types={}
    for line in csv_reader:
        EE_num=0
        row_num=0
        
        result=line[2]
        if result=='Eslint ERROR':
            EE_num+=1
        if line[1] not in type_num:
            type_num[line[1]]=0
        type_num[line[1]]+=1

        if line[2]!="Eslint ERROR":
            lib_type=line[1]
            statement_num=int(line[6].split("\"")[1])
            if statement_num==0:
                statement_num=1
            # print(statement_num)
            error_num=0
            if lib_type not in types:
                types[lib_type]={}
            errors=json.loads(line[2].replace("\'","\""))
            for key in errors:
                error_num+=errors[key]
                # if key in types[lib_type]:
                #     types[lib_type][key]+=errors[key]

                # else:
                #     types[lib_type][key]=errors[key]
                if key in types[lib_type]:
                    types[lib_type][key]+=1

                else:
                    types[lib_type][key]=1
            scatter_data.append([statement_num, error_num])
            total_statement_num+=statement_num
            total_error_num+=error_num
                
            error_per_statement=round(error_num/statement_num)
            if error_num not in error_num_dict:
                error_num_dict[error_num]=0
            error_num_dict[error_num]+=1

            if error_per_statement not in error_statement_dict:
                error_statement_dict[error_per_statement]=0
            error_statement_dict[error_per_statement]+=1


    # for type in types:
    #     print(type)
    #     for error in types[type]:
    #         types[type][error]=round(types[type][error]/type_num[type] * 100, 2)
    #     types[type]=sorted(types[type].items(), key=lambda x: x[1], reverse=True)
    #     print(types[type])
    #     print('\n')
        

# error_num_dict=sorted(error_num_dict.items(), key=lambda x: x[0], reverse=False)
# print(error_num_dict)
# xAxis_data=[]
# yAxis_data=[]

# for error in error_num_dict:
#     # print(error)
#     error=list(error)
#     xAxis_data.append(error[0])
#     yAxis_data.append(error[1])

# print('The violations distribution in the code snippets dataset')
# print(xAxis_data)
# print(yAxis_data)

error_statement_dict=sorted(error_statement_dict.items(), key=lambda x: x[0], reverse=False)
print(error_statement_dict)
# xAxis_data=[]
# yAxis_data=[]

# for error in error_statement_dict:
#     # print(error)
#     error=list(error)
#     xAxis_data.append(error[0])
#     yAxis_data.append(error[1])

# print('The violations per statement distribution in the code snippets dataset')
# print(xAxis_data)
# print(yAxis_data)

print(scatter_data)
# print(outlier_statement_list)
# print(outlier_violation_list)

print(total_error_num)
print(total_statement_num)

end_time=time.time()