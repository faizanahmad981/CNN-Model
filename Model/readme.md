1----------------------------------------------------
first of all we need to unzip this folder after that  open this in vs code after that install follwing dependcies
                        Python 3.x
                        - pip (Python package installer)
                         - Git
                         Python --version
after that to set up the  environment Create a virtual environment

                        python -m venv venv
 now activate this on window 
                        .\venv\Scripts\activate
now download the  CIFAR-10 Dataset
tar -xzvf cifar-10-python.tar.gz -C data
                       python file_name.py
remember data set cifar10 is not in this folder becauase of space download that first then do the further steps 
to run model python  cifar10_identification.ipynb 
2-----------------------------------------------------
# Image Classification Flask App

This repository contains a Flask web application that serves a deep learning model for image classification. The model is trained on the CIFAR-10 dataset.

## Prerequisites

- Python 3.x
- pip (Python package installer)
- Flask
- TensorFlow
- Pillow

after that remember this one is most important set the host as of your ip address that is my ip address is 192.168.2.2 port remains the same 5001
then we will be able to run 
to run the flask app run this command 
python app.py
 
3- -----------------------------------------------------------------
 cifar10_identification.ipynb
 open this in jupyter notebook  run step by step before that upload the dataset cifar10 or open  google collab and upload the data set cifar10  then open this file then run the file step by step u will be able to run 

