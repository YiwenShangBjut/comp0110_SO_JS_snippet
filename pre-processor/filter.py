import csv
import re
import time

start_time=time.time()

num=600

# file_name='SOTorrent_Sample.csv'

file_name='data_'+str(num)+'k.csv'
# new_file_name='SOTorrent_after_filter.csv'

# file_name='data-full.csv'
new_file_name='processed_data_'+str(num)+'k.csv'

def remove_comment(content):
    lines= content.split('\n')
    result=''
    comment_unfinished=False
    for line in lines:
        
        if(line.find("/*")>-1):
            comment_unfinished=True
            line=""
        if(line.find("*/")>-1):
            comment_unfinished=False
            line=""

        if(line.find("//")>-1) and line.find("http://")==-1 and line.find("https://")==-1:
            line_list=line.split('//')
            line=line_list[0]

        if len(line.split())>0 and comment_unfinished==False:
            result=result+line+'\n'

    return result

def remove_html(content):
    lines= content.split('\n')
    result=''
    tag_unfinished=False
    for line in lines:
        # print(line)
        match_tag=re.match(r'^\s*<.*?>',line)
        match_tag_left=re.match(r'^\s*<.*?',line)
        match_tag_right=re.match(r'^.*>\s*?',line)
        if match_tag == None:
            if match_tag_left:
                tag_unfinished=True
            if match_tag_right:
                if tag_unfinished:
                    line=""
                tag_unfinished=False

            if len(line.split())>0 and tag_unfinished==False:
                result=result+line+'\n'

    return result

def remove_words(content):
    lines= content.split('\n')
    result=''
    keyword_list=['js','ts','JS','TS','javascript','typescript','Javascript','Typescript']
    for line in lines:
        match_token_1=re.match(r'^#+.*',line)#not start with #
        match_token_2=re.match(r'^>+.*',line)#not start with >
        match_token_3=re.match(r'^\s*\[\d*?\].*',line)#not start with [num]

        if len(line.split())>0:
            if match_token_1 == None and match_token_2 == None and match_token_3 == None and line.split()[0] not in keyword_list:
                if is_words(line)==False:
                    result=result+line+'\n'

    return result

def is_words(line):
  line_list=line.split()
  if len(line_list)==0:
    return False

  if line_list[0].istitle():
    # if(len(line_list)>1):
    #   if line_list[1].islower():
    #     return True
    # else:
    return True
  
  elif line.find('.')>-1 and line.find(';')==-1 and line.find('(')==-1 and line.find('=')==-1:
    return True
  
  else:
    return False


# def contain_tokens(content):
#     result=False
#     if content.find('(')>-1 and content.find('=')>-1:
#         result= True

def contain_tokens(content):
    result=False
    if content.find('(')>-1 or content.find('=')>-1 or content.find('console')>-1:
        result= True

    return result

def count_line_length(content):
    result=content.count('\n')

    return result


with open(file_name,'r',encoding='utf-8') as csv_file:
    csv_reader = csv.reader(csv_file)

    with open(new_file_name,'w',encoding='utf-8',newline='') as new_file:
        csv_writer=csv.writer(new_file, delimiter=',')
        for line in csv_reader:
            if line[7].isnumeric():
                # print(len(line))
                try:
                    content=line[6]
                except IndexError:
                    print(line)
                    break
                
                content=remove_html(content)
                content=remove_comment(content)
                content=remove_words(content)

                line_length=count_line_length(content)

                if contain_tokens(content) and line_length>6:
                    line[6]=content
                    csv_writer.writerow(line)

end_time=time.time()
print('filter '+str(num*1000)+ ' data cost '+str(end_time-start_time)+' sec')