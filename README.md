# bp_test
 
In this project I`m using MySql db. You need install Docker for local running database. So here are steps:

1. Open your cmd and input next commands:

    ```
    > docker pull mysql
    ```
    ```
    > docker run --name book_dictory -p 8080:3306 -e MYSQL_ROOT_PASSWORD=0000 -d mysql
    ```

2. Run new container *book_directory* in Docker.

3. Connect to db on 8080 port

Run the app and go to localhost:8888
