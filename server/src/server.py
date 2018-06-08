# -*- coding: utf-8 -*-

from websocket_server import WebsocketServer
import json

class OrderingHub():
  def __init__(self, host='localhost', port=7777, isdebug=True):
    self.server = WebsocketServer(port, host)
    self.server.set_fn_new_client(self.new_client)
    self.server.set_fn_client_left(self.client_left)
    self.clients = {}
    self.clientId = 0
    return

  def run(self):
    self.server.run_forever()
    return

  def set_callback(self, callback):
    # self.server.set_fn_message_received(lambda client, server,message: callback(json.loads(message), self.send_all))
    self.server.set_fn_message_received(lambda client, server,message: callback(json.loads(message), self.send_all))
    return

  def send_all(self, message):
    for c in self.clients.values():
      self.server.send_message(c, json.dumps(message))
    return

  def new_client(self, client, server):
    print('hello clinet')
    client['id'] = self.clientId
    self.clients[self.clientId] = client
    print('add client(id={})'.format(self.clientId))
    self.clientId = self.clientId+1
    return
  
  def client_left(self, client, server):
    print('closing clientid={}'.format(client['id']))
    #del self.clients[client['id']]
    return 

    
