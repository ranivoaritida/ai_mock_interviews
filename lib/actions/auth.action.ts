'use server';

import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";

export async function signUp (params : SignUpParams){
 const {uid, name, email} = params;
 try {
    const userRecord = await db.collection('users').doc(uid).get();
    if(userRecord.exists){
        return {
            succes: false,
            message: 'User already exists, please sign in',
        }
    }
    await db.collection('users').doc(uid).set({
        name,
        email
    });

    return{
        succes: true,
        message: 'Account created successfully, please sign in',   
    }
 } catch (e: any) {
    console.error('Error signing up:', e);
    if(e === 'auth/email-already-exists'){
        return {
            succes: false,
            message: 'The email address is already in use by another account.',
        }
    }
    return{
        succes: false,
        message: 'Failed to create an account',
    }
 }
}

export async function signIn (params: SignInParams){
    const {email, idToken} = params;
    try {
        const userRecord = await auth.getUserByEmail(email);
        if(!userRecord){
            return {
                succes: false,
                message: 'User not found, please create an account',
            }
        }
        await setSessionCookie(idToken);
    
    } catch (e: any) {
        console.error('Error signing in:', e);
        if(e === 'auth/user-not-found'){
            return {
                succes: false,
                message: 'User not found, please sign up',
            }
        }
        return{
            succes: false,
            message: 'Failed to sign in',
        }
    } 
}

export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies();
    const sessionCookie = await auth.createSessionCookie(idToken, { 
        //one week ou une semaine
        expiresIn: 60 * 60 * 24 * 7 * 1000 
    });

    cookieStore.set('session', sessionCookie, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
    });
}