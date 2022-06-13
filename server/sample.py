# case_list={"Name":[],'age':''}
# entries_list=['Himanshu','Hemant','Suman']
# key='Name'

# for entry in entries_list:
#     if key in case_list:
#         case_list[key].append(entry)
        
#     else:
#         case_list[key] = entry

# print(case_list)

purchases = [2.50, 4.90, 5.60, 2.40]

def calculate_total_purchases(purchases):
    total = sum(purchases)
    return total

total_purchases = calculate_total_purchases(purchases)
print(total_purchases)

name=[20,30,40]
name.ap