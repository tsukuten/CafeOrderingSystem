# -*- coding: utf-8 -*-

from server import OrderingHub
import json

# 注文内容のdictonaryの例
# {
#   type:'request',
#   op:'create',
#   acc:{
#     id: 00001,
#     date: Date.now(),
#     persons:3,
#     items:{
#       coffe:1,
#       cake:3,
#       tea:1
#     },
#     total:1000,
#     status:'new', //seated,sreved,left,done
#     description:'this is test account'
#   }
# }

def handle_message(self, message, send):
  # messageはdictonary型。注文の内容は以下のように取得する。
  # 上の注文内容のdictonaryの例を参考に値を参照できる。

  print(type(message))
  # print(message['acc']['id'])
  message['acc']['id'] = self.orderId;
  self.orderId += 1;
  # print(message['acc']['items']['coffe'])

  #今回は受け取った注文内容をそのままブラウザに反映させている。
  send(message)

if __name__ == '__main__':
  hub = OrderingHub()
  hub.set_callback(handle_message)
  hub.run()
