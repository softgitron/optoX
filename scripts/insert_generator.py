#SQL Database filler
import random

#employee_id        1....
#bank_account_id    1000...
#opticians_id       10000...
#opthalmologist_id  20000...
#customer_id        30000...
#inspection_id      40000...
#contract_id        50000...
#admin_id           60000...

def getcountry(optician_id, opticians):
    for line in opticians:
        if line[0] == optician_id:
            return line[2]
            break


def getcustomercountry(optician_id, opticians):
    for line in opticians:
        if line[0] == optician_id:
            return line[1]
            break





def main():
    admins=[]

    #bank accounts

    with open ("inserts.txt", "w") as f:
        f.write("INSERT INTO bank_accounts (bank_account_id, balance) VALUES\n")
    with open ("inserts.txt", "a") as f:
        for i in range (1001,1101):
            line = ("(" + str(i) + ", " + str(random.randint(0,300000)) + "),\n")
            f.write(line)
        line = ("(0, 0);\n\n")
        f.write(line)



    #opticians
    opticians = []
    
    with open ("opticians.csv", "r") as f:
        
        #first insert line
        with open ("inserts.txt", "a") as w:
            w.write("INSERT INTO opticians (optician_id, bank_account_id, optician_country, name)VALUES\n")

        #middle insert lines
        for line in f:
            line = line.replace("'","")
            words = line.split(",")
            opticians.append(words)
            with open ("inserts.txt", "a") as w:
                w.write("(" + words[0] + ", " + words[1] + ", '" + words[2] + "', '" + words[3]+"'),\n")

        #last insert line (put dummydata here)
        with open ("inserts.txt", "a") as w:
            w.write("(0, 0, 'Finland', 'Nissen');\n\n")




    #optician_employees
    

    with open ("optician_employees.csv", "r") as f:
        
        #first insert line
        with open ("inserts.txt", "a") as w:
            w.write("INSERT INTO optician_employees (employee_id, optician_id, optician_country, optician_employee_country, social_security_number, email, password, first_name, last_name, access_level) VALUES\n")

        #middle insert lines
        for line in f:
            line = line.replace("'","")
            words = line.split(",")
            country = getcountry(words[1], opticians)
            if (words[9] == 'Administrator'):#this is for the administrator table later
                admins.append([words[5], words[6]])
                
            with open ("inserts.txt", "a") as w:
                w.write("(" + words[0] + ", " + words[1] + ", '" + country + "', '" + country + "', '" + words[4] + "', '" + words[5] + "', '" + words[6] + "', '" + words[7] + "', '" + words[8] + "', '" + words[9] + "'),\n")

        #last insert line (put dummydata here)
        with open ("inserts.txt", "a") as w:
            w.write("(0, 0, 'Finland', 'Finland', '456878-1458', 'optician@mail.com', 'optician', 'First', 'Last', 'Normal');\n\n")




    #opthalmologists
    opthalmologists = []
    with open ("opthalmologists.csv", "r") as f:
        
        #first insert line
        with open ("inserts.txt", "a") as w:
            w.write("INSERT INTO opthalmologists (opthalmologist_id, bank_account_id, opthalmologist_country, name)VALUES\n")

        #middle insert lines
        for line in f:
            line = line.replace("'","")
            words = line.split(",")
            opthalmologists.append(words)
            with open ("inserts.txt", "a") as w:
                w.write("(" + words[0] + ", " + words[1] + ", '" + words[2] + "', '" + words[3]+"'),\n")

        #last insert line (put dummydata here)
        with open ("inserts.txt", "a") as w:
            w.write("(0, 0, 'Finland', 'TAYS');\n\n")





    #opthalmologist_employees

    with open ("opthalmologist_employees.csv", "r") as f:
        
        #first insert line
        with open ("inserts.txt", "a") as w:
            w.write("INSERT INTO opthalmologist_employees (employee_id, opthalmologist_id, opthalmologist_country, opthalmologist_employee_country, social_security_number, email, password, first_name, last_name, access_level) VALUES\n")

        #middle insert lines
        for line in f:
            line = line.replace("'","")
            words = line.split(",")
            country = getcountry(words[1], opthalmologists)
            if (words[9] == 'Administrator'):#this is for the administrator table later
                admins.append([words[5], words[6]])
            with open ("inserts.txt", "a") as w:
                w.write("(" + words[0] + ", " + words[1] + ", '" + country + "', '" + country + "', '" + words[4] + "', '" + words[5] + "', '" + words[6] + "', '" + words[7] + "', '" + words[8] + "', '" + words[9] + "'),\n")

        #last insert line (put dummydata here)
        with open ("inserts.txt", "a") as w:
            w.write("(0, 0, 'Finland', 'Finland', '456878-1458', 'opthalmologist@mail.com', 'opthalmologist', 'First', 'Last', 'Normal');\n\n")






    #customers
    customers = []
    
    with open ("customers.csv", "r") as f:
        
        #first insert line
        with open ("inserts.txt", "a") as w:
            w.write("INSERT INTO customers (customer_id, customer_country, social_security_number, email, first_name, last_name)VALUES\n")

        #middle insert lines
        for line in f:
            line = line.replace("'","")
            words = line.split(",")
            customers.append(words)
            with open ("inserts.txt", "a") as w:
                w.write("(" + words[0] + ", '" + words[1] + "', '" + words[2] + "', '" + words[3] + "', '" + words[4] + "', '" + words[5] + "'),\n")

        #last insert line (put dummydata here)
        with open ("inserts.txt", "a") as w:
            w.write("(0, 'Finland', '456878-1458', 'user@mail.com', 'First', 'Last');\n\n")





    #inspections

    with open ("inspections.csv", "r") as f:
        
        #first insert line
        with open ("inserts.txt", "a") as w:
            w.write("INSERT INTO inspections (inspection_id, customer_id, customer_country, optician_id, optician_country, opthalmologist_id, opthalmologist_country, inspections_country, fundus_photo_ref, oct_scan_ref, visual_field_ref, inspection_time, login_token) VALUES\n")

        #middle insert lines
        for line in f:
            line = line.replace("'","")
            words = line.split(",")
            customercountry = getcustomercountry(words[1], customers)
            inspectioncountry = getcountry(words[3], opticians)
            opthalmologistcountry = getcountry(words[5], opthalmologists)
            with open ("inserts.txt", "a") as w:
                w.write("(" + words[0] + ", " + words[1] + ", '" + customercountry + "', " + words[3] + ", '" + inspectioncountry + "', " + words[5] + ", '" + opthalmologistcountry + "', '" + inspectioncountry + "', " + words[8] + ", " + words[9] + ", " + words[10] + ", '" + words[11] + "', '" + words[12] + "'),\n")

        #last insert line (put dummydata here)
        with open ("inserts.txt", "a") as w:
            w.write("(0, 0, 'Finland', 0, 'Finland', 0, 'Finland', 'Finland', 1, 2, 3, NOW(), '1234567890123456');\n\n")



    #contracts

    
    with open ("inserts.txt", "a") as w:
    #first insert line
        w.write("INSERT INTO contracts (contract_id, optician_id, optician_country, opthalmologist_id, opthalmologist_country, contracts_country) VALUES\n")
        
    #middle insert lines
        i = 50001
        for opt in opticians:
            y = random.randint(0,49)
            w.write("(" + str(i) + ", " + str(opt[0]) + ", '" + str(opt[2]) + "', " + str(opthalmologists[y][0]) + ", '" + opthalmologists[y][2] + "', '" + opt[2] + "'),\n")
            i = i+1
    #last insert line (put dummydata here)
    with open ("inserts.txt", "a") as w:
        w.write("(0, 0, 'Finland', 0, 'Finland', 'Finland');\n\n")
            


    #administrators

    
    with open ("inserts.txt", "a") as w:
    #first insert line
        w.write("INSERT INTO administrators (admin_id, access_level, email, password) VALUES\n")
        
    #middle insert lines
        i = 60001
        for adm in admins:
            w.write("(" + str(i) + ", " + "'Administrator', '" + adm[0]+ "', '" + adm[1] + "'),\n")
            i = i+1
    #last insert line (put dummydata here)
    with open ("inserts.txt", "a") as w:
        w.write("(0, 'Administrator', 'admin@mail.com', 'admin1');\n\n")
            



            
main()

