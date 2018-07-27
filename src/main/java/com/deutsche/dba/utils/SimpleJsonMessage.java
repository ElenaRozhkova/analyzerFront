/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.deutsche.dba.utils;

/**
 *
 * @author Selvyn
 */
public class SimpleJsonMessage  implements Message
{
    private String  data;
    
    public  SimpleJsonMessage(){}
    
    public  SimpleJsonMessage( String data )
    {
        this.data = data;
    }
    
    @Override
    public String getData()
    {
        return data;
    }

    @Override
    public void setData(String data)
    {
        this.data = data;
    }
    
}
