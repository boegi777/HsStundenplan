/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.JsonParser;
import com.google.gson.JsonObject;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map.Entry;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author paul
 */
@Path("stundenplan")
public class StundenplanRessource {

    public static TimetableListener timetableListener = null;
    Connection con = null;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String stundenplanGET() {
        JsonObject json = buildStundenplanJson();
        return json.toString();
    }
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String stundenplanPOST(@FormParam("timetable") String timetable){
        updateStundenplan(timetable);
        JsonObject json = buildStundenplanJson();
        return json.toString();
    }
    
    public interface TimetableListener{
        void onTimetableChanged();
    }
    
    public static void setTimetableListener(TimetableListener listener){ timetableListener = listener; }
    
    private JsonObject buildStundenplanJson(){
        JsonObject timetableJSON = new JsonObject();
        try {
            String query = "SELECT * FROM Eintrag;";
            DatabaseManager dm = new DatabaseManager();
            con = dm.setConnection();
            PreparedStatement pst = con.prepareStatement(query);
            ResultSet rs = pst.executeQuery();

            while (rs.next()) {
                  JsonObject entryJSON = new JsonObject();
                  entryJSON.addProperty("time", rs.getString(2));
                  entryJSON.addProperty("dayOne", rs.getString(3));
                  entryJSON.addProperty("dayTwo", rs.getString(4));
                  entryJSON.addProperty("dayThree", rs.getString(5));
                  entryJSON.addProperty("dayFour", rs.getString(6));
                  entryJSON.addProperty("dayFive", rs.getString(7));
                  
                  timetableJSON.add(rs.getString(1), entryJSON);
            }
        } catch (SQLException ex){
            System.out.println("SQLException: " + ex.getMessage());
            System.out.println("SQLState: " + ex.getSQLState());
            System.out.println("VendorError: " + ex.getErrorCode());
        }
        return timetableJSON;
    }
    
    private void updateStundenplan(String timetable){
        JsonParser jsonParser = new JsonParser();
        PreparedStatement pst = null;
        com.google.gson.JsonObject timetableJSON = jsonParser.parse(timetable).getAsJsonObject();
        int index = 0;
        try {
            DatabaseManager dm = new DatabaseManager();
            con = dm.setConnection();
            pst = con.prepareStatement("DELETE FROM eintrag;");
            pst.executeUpdate();
            for (Entry entry : timetableJSON.entrySet()) {
                com.google.gson.JsonObject entryJSON = (com.google.gson.JsonObject) entry.getValue();
                pst = con.prepareStatement(dm.getEntryInsertQuery(entryJSON, index));
                int code = pst.executeUpdate();
                index++;
            }
            if(timetableListener != null){
                timetableListener.onTimetableChanged();
            }
        } catch (SQLException ex) {
                    System.out.println("SQLException: " + ex.getMessage());
                    System.out.println("SQLState: " + ex.getSQLState());
                    System.out.println("VendorError: " + ex.getErrorCode());
                    String test = ex.getMessage();
                    System.out.println(test);
        }
    }
}
