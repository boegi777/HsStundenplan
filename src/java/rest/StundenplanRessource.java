/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 *
 * @author paul
 */
@Path("stundenplan")
public class StundenplanRessource {

Connection conn = null;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response stundenplan() throws SQLException, ClassNotFoundException{
        String test = "test";
        String query = "SELECT * FROM Eintrag;";
        String url = "jdbc:mysql://localhost:8889/stundenplan?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC";
        String user = "root";
        String password = "root";
        
        Class.forName("com.mysql.jdbc.Driver");
        JsonObjectBuilder builder = Json.createObjectBuilder();
        try (Connection con = DriverManager.getConnection(url, user, password);
                PreparedStatement pst = con.prepareStatement(query);
                ResultSet rs = pst.executeQuery()) {
      
            
            while (rs.next()) {
                builder.add(rs.getString(1), Json.createObjectBuilder()
                    .add("time", rs.getString(2))
                    .add("dayOne", rs.getString(3))
                    .add("dayTwo", rs.getString(4))
                    .add("dayThree", rs.getString(5))
                    .add("dayFour", rs.getString(6))
                    .add("dayFive", rs.getString(7))
                );
            }
        } catch (SQLException ex){
            System.out.println("SQLException: " + ex.getMessage());
            System.out.println("SQLState: " + ex.getSQLState());
            System.out.println("VendorError: " + ex.getErrorCode());
        }
        JsonObject json = builder.build();
        return Response.ok()
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
                .header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, X-Codingpedia")
                .entity(json)
                .allow("OPTIONS").build();
    }
}
