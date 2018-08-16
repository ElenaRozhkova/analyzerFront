/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.deutsche.dba.web;


import com.deutsche.dba.utils.SimpleJsonMessage;
import deutschebank.core.ApplicationScopeHelper;
import deutschebank.core.UserController;
import deutschebank.core.InstrumentController;
import deutschebank.dbutils.User;
import deutschebank.dbutils.UserHandler;
import deutschebank.dbutils.Instrument;
import deutschebank.dbutils.InstrumentHandler;
import deutschebank.dbutils.SQLQueries;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


/**
 *
 * @author Selvyn
 */
@Path("/services")
public class DBDAServicePort implements IDBDAServicePort
{
    final   UserController userController = new UserController();
    final   InstrumentController instrumentController = new InstrumentController();
    final   SQLQueries sqlQueries = new SQLQueries();

    @Override
    @GET
    @Path("/sayhello")
    public Response sayHtmlHelloTest()
    {
        String result = "<html> " + "<title>" + "DBDA" + "</title>"
                + "<body><h1>" + "the dbda is running..." + "</h1></body>" + "</html> ";

        return Response.status(200).entity(result).build();
    }
    
    @Override
    @GET
    @Path("/getAllTags")
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    public Response getAllTags()
    {
        String result = "getAllTags() need to be built";
    	return Response.ok(result, MediaType.APPLICATION_JSON_TYPE).build();
    }
    
    @Override
    @GET
    @Path("/getAllURL")
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    public Response getAllURL()
    {
        String result = "getAllURL() need to be built";
    	return Response.ok(result, MediaType.APPLICATION_JSON_TYPE).build();
    }

    @Override
    @GET
    @Path("/get/{tags}")
    public Response getSavedURLWithInfo(@PathParam("tags")String tags)
    {
        String result = "getSavedURLWithInfo() need to be built";
    	return Response.ok(result, MediaType.APPLICATION_JSON_TYPE).build();
    }

    @Override
    @GET
    @Path("/login/{usr}/{pwd}")
    public Response loginWithInfo( @PathParam("url")String usr,
                                        @PathParam("description")String description,
                                        @PathParam("tags")String tags )
    {
        String result = "loginWithInfo() need to be built";
    	return Response.ok(result, MediaType.APPLICATION_JSON_TYPE).build();
    }

    @Override
    @POST
    @Path("/login")
    public Response loginWithInfoFromForm( @FormParam("usr")String usr,
                                        @FormParam("pwd")String pwd )
    {
        String result = userController.verifyLoginDetails(usr, pwd);
                
        if( result != null)
        {
            return Response.ok(result, MediaType.APPLICATION_JSON_TYPE).build();
        }
        else
            return Response.status(400).entity(new SimpleJsonMessage("User could not be found")).build();
    }
    
    @Override
    @GET
    @Path("/get/buy/{usr}/{instr}/avg")
    public Response getInstrumentBuyAvgPrice(  @PathParam("usr")String usr,
    		@PathParam("instr")int instr ) {
    	 String result = SQLQueries.avgPriceBought(instr);
        
        if( result != null)
        {
            return Response.ok(result, MediaType.APPLICATION_JSON_TYPE).build();
        }
        else
            return Response.status(400).entity(new SimpleJsonMessage("Data could not be retrieved")).build();
    }
    
    @Override
    @GET
    @Path("/get/sell/{usr}/{instr}/avg")
    public Response getInstrumentSellAvgPrice(  @PathParam("usr")String usr,
    		@PathParam("instr")int instr ) {
    	 String result = SQLQueries.avgPriceSold(instr);
        
        if( result != null)
        {
            return Response.ok(result, MediaType.APPLICATION_JSON_TYPE).build();
        }
        else
            return Response.status(400).entity(new SimpleJsonMessage("Data could not be retrieved")).build();
    }
    
    @Override
    @GET
    @Path("/get/buy/{usr}/{instr}/vol")
    public Response getInstrumentBuyVolPrice(  @PathParam("usr")String usr,
    		@PathParam("instr")int instr ) {
    	 String result = SQLQueries.volumeBought(instr);
        
        if( result != null)
        {
            return Response.ok(result, MediaType.APPLICATION_JSON_TYPE).build();
        }
        else
            return Response.status(400).entity(new SimpleJsonMessage("Data could not be retrieved")).build();
    }
    
    @Override
    @GET
    @Path("/get/sell/{usr}/{instr}/vol")
    public Response getInstrumentSellVolPrice(  @PathParam("usr")String usr,
    		@PathParam("instr")int instr ) {
    	 String result = SQLQueries.volumeSold(instr);
        
        if( result != null)
        {
            return Response.ok(result, MediaType.APPLICATION_JSON_TYPE).build();
        }
        else
            return Response.status(400).entity(new SimpleJsonMessage("Data could not be retrieved")).build();
    }
    
    @Override
    @GET
    @Path("/get/data/raw")
    public Response getRawData( ) {
        String result = SQLQueries.toJSON(SQLQueries.rawDataTable());
        
        if( result != null)
        {
            return Response.ok(result, MediaType.APPLICATION_JSON_TYPE).build();
        }
        else
            return Response.status(400).entity(new SimpleJsonMessage("Data could not be retrieved")).build();
    }
    
    @Override
    @GET
    @Path("/get/buy/{usr}/{instr}")
    public Response getInstrumentBuyPrice(  @PathParam("usr")String usr,
    		@PathParam("instr")int instr ) {
        String result = SQLQueries.toJSON(SQLQueries.instrumentBuyPriceVsTime(instr));
        
        if( result != null)
        {
            return Response.ok(result, MediaType.APPLICATION_JSON_TYPE).build();
        }
        else
            return Response.status(400).entity(new SimpleJsonMessage("Data could not be retrieved")).build();
    }
    
    @Override
    @GET
    @Path("/get/sell/{usr}/{instr}")
    public Response getInstrumentSellPrice(  @PathParam("usr")String usr,
    		@PathParam("instr")int instr ) {
    	 String result = SQLQueries.toJSON(SQLQueries.instrumentSellPriceVsTime(instr));
        
        if( result != null)
        {
            return Response.ok(result, MediaType.APPLICATION_JSON_TYPE).build();
        }
        else
            return Response.status(400).entity(new SimpleJsonMessage("Data could not be retrieved")).build();
    }
    
    @Override
    @GET
    @Path("/get/mtb/{usr}/{instr}")
    public Response getInstrumentMtb(  @PathParam("usr")String usr,
    		@PathParam("instr")int instr ) {
    	 String result = SQLQueries.mostTradedBy(instr);
        
        if( result != null)
        {
            return Response.ok(result, MediaType.APPLICATION_JSON_TYPE).build();
        }
        else
            return Response.status(400).entity(new SimpleJsonMessage("Data could not be retrieved")).build();
    }
    
    @Override
    @GET
    @Path("/get/instruments/all")
    public Response getAllInstruments( ) {
        String result = instrumentController.getAllInstruments();
        
        if( result != null)
        {
            return Response.ok(result, MediaType.APPLICATION_JSON_TYPE).build();
        }
        else
            return Response.status(400).entity(new SimpleJsonMessage("Data could not be retrieved")).build();
    }
}
