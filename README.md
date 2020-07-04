# julyfour


## В общем 4 микросервисов
У каждого своя функция

### auth-svc
1. Этот микросервис не общается с остальными 
2. Задача в том чтобы регистрировать и получить сессионный ключ


### query-svc
1. Тоже не общается с другими
2. Нужно дать сессионный ключ чтобы получить конфиги
3. Если к определенному юзеру не соответсвует никакой конфиг то отдаст глобальные конфиги


### operation-svc
1. Создан для админа
2. Можеть изменить определенный конфиг или добавить новую
3. Во время изменения отправляет запрос к events-svc чтобы тот сообщил клиентам


### events-svc
1. Клиенты обращаются к этому микросервису чтобы соединится с server-stream
2. Нужно дать сессионный ключ чтобы иметь доступ
3. Он принимает запросы от operation-svc
4. Если изменение глобальное то всем сообщает
5. В противном случае отправляет сообщение только онсящимуся юзуру