/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author Paul
 */
public class DatabaseManager {
        
    private String test = "test";
    private String url = "jdbc:mysql://localhost:3306/stundenplan?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC";
    private String user = "root";
    private String password = "";
    private Connection con;

    DatabaseManager(){
        try{
            Class.forName("com.mysql.jdbc.Driver");
        } catch(ClassNotFoundException ex){
            System.out.println("Database driver not found!");
        }
    }

    public Connection setConnection(){
        try {
            con = DriverManager.getConnection(this.url, this.user, this.password);
            return con;
        } catch(SQLException ex){
            System.out.println(ex.getMessage());
            return null;
        }
    }
    
    public String getAuthQuery(String username, String password) throws QueryException{
        if(username.equals("") || password.equals("")){
            throw new QueryException();
        }
        String query = "";
        query += "SELECT * FROM benutzer WHERE ";
        query += "name = '" + username + "' AND ";
        query += "passwort = '" + password + "';";
        return query;
    }
}
