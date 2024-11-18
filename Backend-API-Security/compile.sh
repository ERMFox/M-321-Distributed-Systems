g++ -std=c++17 src/main.cpp src/handlers/jwt_handler.cpp src/handlers/html_handler.cpp -o server \
    -I src/include \
    -I /usr/local/include \
    -L /usr/local/lib \
    -lpistache \
    -lssl \
    -lcrypto \
    -lpthread \
    -ljwt
