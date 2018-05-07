/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.websocket.EncodeException;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 *
 * @author Paul
 */
@ServerEndpoint("/socket")
public class Websocket {
    
    /** All open WebSocket sessions */
    static Set<Session> peers = Collections.synchronizedSet(new HashSet<Session>());
    
    @OnOpen
    public void openConnection(Session session){
        peers.add(session);
        StundenplanRessource.setTimetableListener(new StundenplanRessource.TimetableListener() {
            @Override
            public void onTimetableChanged() {
                try {
                    String msg = "200";
                    for(Session session : peers) {
                       session.getBasicRemote().sendObject(msg); 
                    }  
                } catch (IOException ex) {
                    Logger.getLogger(Websocket.class.getName()).log(Level.SEVERE, null, ex);
                } catch (EncodeException ex) {
                    Logger.getLogger(Websocket.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        });
    }
    
    @OnMessage
    public String handleMessage(String message){
            return "Thanks for the message: " + message;
    }
}
