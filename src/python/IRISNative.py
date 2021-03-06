import irisnative

# Modify connection info based on your environment
ip = "127.0.0.1"
port = 51773
namespace = "USER"
username = "_SYSTEM"
password = "SYS"

# create database connection and IRIS instance
connection = irisnative.createConnection(ip,port,namespace,username,password)
dbnative = irisnative.createIris(connection)

print("[1. Setting and getting a global]")
# setting and getting a global
# ObjectScript equivalent: set ^python("1") = 8888
dbnative.set(8888, "python", "1")

# ObjectScript equivalent: set globalValue = $get(^python("1"))
globalValue = dbnative.get("python","1")

print("The value of python is ", globalValue)
print()

print("[2 Iterating over a global]")
# modify global to iterate over
# ObjectScript equivalent: set ^python("1") = 8888
# ObjectScript equivalent: set ^python("2") = 9999
dbnative.set(8888, "python", "1")
dbnative.set(9999, "python", "2")

Iter = dbnative.iterator("python")
print("walk forwards")
for subscript, value in Iter.items():
    print("subscript= {}, value={}".format(subscript, value))
print()

print("[3. Calling a class method]")
# calling a class  method
# ObjectScript equivalent: set returnValue = ##class(%Library.Utility).Date(5)
returnValue = dbnative.classMethodValue("%Library.Utility", "Date", 5)
print(returnValue)

# close connection
connection.close()