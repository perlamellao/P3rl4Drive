import os





def upload_file(file, filename):
    pass
    
    
def get_files(id):
    files = []
    init_path = os.getcwd()
    try:
        os.chdir("files/{}".format(id))
    except FileNotFoundError:
        print("Usuario nuevo, creando carpeta...")
        os.makedirs(name="files/{}".format(id))
        os.chdir("files/{}".format(id))
        
    for i in os.listdir():
        files.append(i)
    
    os.chdir(init_path)
    return(files)




