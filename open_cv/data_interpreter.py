import numpy as np
def std_deviation(data):
    arr_y = np.zeros((len(data)))
    arr_x = np.zeros((len(data)))
    for i in range(len(data)):
        arr_x[i] = data[i][0]
        arr_y[i] = data[i][1]
    mean_x = np.mean(arr_x)
    mean_y = np.mean(arr_y)
    std_x = np.std(arr_x)
    std_y = np.std(arr_y)

    data_filter = []

    for i in range(len(data)):
        if arr_x[i] > mean_x - 1.5 * std_x and \
           arr_x[i] < mean_x + 1.5 * std_x:
           if arr_y[i] > mean_y - 1.5 * std_y and \
              arr_y[i] < mean_y + 1.5 * std_y:
                data_filter.append([arr_x[i], arr_y[i]])

    return data_filter
    print (data_filter)
    print (std_x, std_y)
    print (mean_x, mean_y)
    print (len(data_filter))
    print (data_filter)
    print(numpy.std(data_filter[0,:]), numpy.std(data_filter[1,:]))
