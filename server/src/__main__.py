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

def handle_message(message, send):
  # messageはdictonary型。注文の内容は以下のように取得する。
  # 上の注文内容のdictonaryの例を参考に値を参照できる。

  print(type(message))
  print(message['type'])
  print(message['acc']['items']['coffe'])


  #
  # ここで注文の管理を行う。
  # 今回はtype = request, op=createしかないが、
  # 今後は、typeやopによって振る舞いを変える必要がある。
  # 自分で例題を考えてこの関数になれておく。(例えば、内容を少し書き換えて送ってみるなど)
  #

  #今回は受け取った注文内容をそのままブラウザに反映させている。
  send(message)

if __name__ == '__main__':
  hub = OrderingHub()
  hub.set_callback(handle_message)
  hub.run()
