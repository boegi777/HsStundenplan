/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

/**
 *
 * @author Paul
 */
public class QueryException extends Exception{
    
    @Override
    public String getMessage(){
        return "incorrect query!";
    }
}
