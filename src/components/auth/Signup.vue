<template>
<div class="signup container">
    <form @submit.prevent="signup" class="card-panel">
        <h2 class="center deep-purple-text">Signup</h2>
        <div class="field">
            <label for="email">Email:</label>
            <input type="email" name="email" v-model="email">
        </div>
        <div class="field">
            <label for="password">Password:</label>
            <input type="password" name="password" v-model="password">
        </div>
        <div class="field">
            <label for="repeatPassword">Repeat password:</label>
            <input type="Password" name="repeatPassword" v-model="repeatPassword">
        </div>
        <div class="field">
            <label for="alias">Alias:</label>
            <input type="text" name="alias" v-model="alias">
        </div>
        
        <p class="red-text center" v-if="feedback">{{feedback}}</p>
        <div class="field center">
            <button class="btn deep-purple">Signup</button>
        </div>
    </form>
    <p class="center deep-purple-text" @click="showHelp"> <a href="">Need help?</a> </p>
</div>
    
</template>

<script>
import slugify from 'slugify'
import { db } from '@/main';
import firebase from 'firebase'
export default {
    data(){
        name: 'signup'
        return {
            email: null,
            password: null,
            repeatPassword: null,
            alias:null,
            feedback: null,
            slug: null

        }
    },
    methods: {
        signup(){
            if(this.alias && this.email && this.password){
                 this.slug = slugify(this.alias, {
                    replacement: '-',
                    remove: /[$*_+~.()'"\-:@']/g,
                    lower: true
                })
                let ref = db.collection('users').doc(this.slug)
                ref.get().then(doc => {
                    if(doc.exists){
                        this.feedback = 'This alias already exists'
                    } else {

                        if(this.password == this.repeatPassword){
                        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                        .then(cred => { 
                        ref.set({
                            alias: this.alias,
                            geolocation: null,
                            user_id: cred.user.uid

                          })
                        }).then(()=>{
                            this.$router.push({name: 'GMap'})
                        })
                        .catch(err => console.log(err))
                        this.feedback = err.message
                        }else{
                            this.feedback = 'Passwords dont match'
                            
                        }
                    }
                })
                console.log(this.slug)
            }else{
                this.feedback = 'Must enter all fields'
            }
        },
        showHelp(){
             this.$router.push({name: 'Help'});
        }
    }
}
</script>

<style>

.signup{
    max-width: 400px;
    margin-top: 60px;
}
.signup h2{
    font-size: 2.4em
}


</style>