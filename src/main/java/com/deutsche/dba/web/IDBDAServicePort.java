/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.deutsche.dba.web;

import java.util.List;

import javax.ws.rs.Consumes;
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
public interface IDBDAServicePort
{
    @GET
    @Path("/sayhello")
    @Produces(MediaType.TEXT_HTML)
    public Response sayHtmlHelloTest();
    
    @GET
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    public Response getAllTags();
    
    @GET
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    public Response getAllURL();
    
    @GET
    @Path("/get/{tags}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getSavedURLWithInfo(@PathParam("tags") String tags);

    @POST
    @Path("/login/{usr}/{pwd}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response loginWithInfo( @PathParam("url")String url,
                                        @PathParam("description")String description,
                                        @PathParam("tags")String tags );

    @POST
    @Path("/login")
    @Produces(MediaType.APPLICATION_JSON)
    public Response loginWithInfoFromForm(  @FormParam("usr")String usr,
                                            @FormParam("pwd")String pwd );
    
    @GET
    @Path("/get/buy/{usr}/{instr}/avg")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getInstrumentBuyAvgPrice(  @PathParam("usr")String usr,
    		@PathParam("instr")int instr );
    
    @GET
    @Path("/get/sell/{usr}/{instr}/avg")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getInstrumentSellAvgPrice(  @PathParam("usr")String usr,
    		@PathParam("instr")int instr );
    
    @GET
    @Path("/get/buy/{usr}/{instr}/vol")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getInstrumentBuyVolPrice(  @PathParam("usr")String usr,
    		@PathParam("instr")int instr );
    
    @GET
    @Path("/get/sell/{usr}/{instr}/vol")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getInstrumentSellVolPrice(  @PathParam("usr")String usr,
    		@PathParam("instr")int instr );
    
    @GET
    @Path("/get/buy/{usr}/{instr}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getInstrumentBuyPrice(  @PathParam("usr")String usr,
    		@PathParam("instr")int instr );
    
    @GET
    @Path("/get/sell/{usr}/{instr}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getInstrumentSellPrice(  @PathParam("usr")String usr,
    		@PathParam("instr")int instr );
    
    @GET
    @Path("/get/mtb/{usr}/{instr}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getInstrumentMtb(  @PathParam("usr")String usr,
    		@PathParam("instr")int instr );
    
    @GET
    @Path("/get/instruments/all")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllInstruments();
    
    @GET
    @Path("/get/priceinfo/{usr}/{instr}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getInstrumentPriceInfo(@PathParam("usr")String usr,
    		@PathParam("instr")int instr);
    
    @GET
    @Path("/get/data/raw")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getRawData();
    
    @GET
    @Path("/get/counterparty/raw")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getRawCounterparty();
    
    @GET
    @Path("/get/counterparty/{usr}/{count}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCounterpartyById(@PathParam("usr")String usr,
    		@PathParam("count")int count);

}
