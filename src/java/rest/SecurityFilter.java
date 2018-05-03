/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.StringTokenizer;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;
import org.glassfish.jersey.internal.util.Base64;

/**
 *
 * @author Paul
 */
@Provider
public class SecurityFilter implements ContainerRequestFilter {

    private static final String AUTHORIZATION_HEADER_KEY = "Authorization";
    private static final String AUTHORIZATION_HEADER_PREFIX = "Basic ";
    private Connection con;

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        List<String> authHeader = requestContext.getHeaders().get(AUTHORIZATION_HEADER_KEY);
        if (requestContext.getMethod().equals("POST")) {
            if (authHeader != null && authHeader.size() > 0) {
                String authToken = authHeader.get(0);
                authToken = authToken.replaceFirst(AUTHORIZATION_HEADER_PREFIX, "");
                String decodedString = Base64.decodeAsString(authToken);
                StringTokenizer tokenizer = new StringTokenizer(decodedString, ":");
                String username = "";
                String password = "";
                if (tokenizer.hasMoreTokens()) {
                    username = tokenizer.nextToken();
                }
                if (tokenizer.hasMoreTokens()) {
                    password = tokenizer.nextToken();
                }
                try {
                    DatabaseManager dm = new DatabaseManager();
                    String query = dm.getAuthQuery(username, password);
                    con = dm.setConnection();
                    PreparedStatement pst = con.prepareStatement(query);
                    ResultSet rs = pst.executeQuery();
                    if (rs.next()) {
                        return;
                    }
                } catch (SQLException ex) {
                    System.out.println("SQLException: " + ex.getMessage());
                    System.out.println("SQLState: " + ex.getSQLState());
                    System.out.println("VendorError: " + ex.getErrorCode());
                } catch (QueryException ex) {
                    sendUnauthorizedRequest(requestContext);
                }
                
                sendUnauthorizedRequest(requestContext);
            }
        }
    }

    private void sendUnauthorizedRequest(ContainerRequestContext requestContext) {
        Response unauthorizedStatus = Response
                .status(Response.Status.UNAUTHORIZED)
                .entity("Unauthorized Request")
                .build();

        requestContext.abortWith(unauthorizedStatus);
    }
}
