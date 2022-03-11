import os





def upload_file(file, filename):
    pass
    
    
def get_files(id):
    files = []
    init_path = os.getcwd()
    os.chdir("files/{}".format(id))
    for i in os.listdir():
        files.append(i)
    
    os.chdir(init_path)
    return(files)




