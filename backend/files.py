import os, re



    
    
def get_files(id, search):

    files = []
    init_path = os.getcwd()
    try:
        os.chdir("files/{}".format(id))
    except FileNotFoundError:
        print("Se ha intentado inyectar una cookie no valida")
    if search == "":
        for file in os.listdir():
            files.append(file)
    else:
        for file in os.listdir():
            if re.search(search.lower(),  file.split('.')[0].lower()):
                files.append(file)
    
    os.chdir(init_path)
    return(files)




