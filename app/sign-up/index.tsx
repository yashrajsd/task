import { auth } from "@/config/firebase";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
    const router = useRouter();
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("User logged in:", user);
                router.replace("/"); 
            }
        });

        return () => unsubscribe();
    }, []);

    const handleUserSignUp = async () => {
        if (!password || !email || !name) return;
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Account created successfully!");
        } catch (err) {
            console.log(err);
            alert("Sign-up failed. Please try again.");
        }
    };

    return (
        <View style={{ flex: 1, gap: 40, backgroundColor: '#1F1F1F', justifyContent: 'center', paddingHorizontal: 20 }}>
            <View style={{ gap: 30 }}>
                <KeyboardAvoidingView style={{ gap: 20 }}>
                    <View style={{ gap: 10 }}>
                        <Text style={{ color: 'white', fontWeight: '600' }}>Full name</Text>
                        <TextInput
                            value={name}
                            onChangeText={(text) => setName(text)}
                            placeholder="Full Name"
                            placeholderTextColor="#888"
                            style={{ backgroundColor: '#2F2F2F', borderRadius: 20, padding: 20, color: 'white', fontWeight: "600" }}
                        />
                    </View>
                    <View style={{ gap: 10 }}>
                        <Text style={{ color: 'white', fontWeight: '600' }}>Email address</Text>
                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            placeholder="Email"
                            placeholderTextColor="#888"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            style={{ backgroundColor: '#2F2F2F', borderRadius: 20, padding: 20, color: 'white', fontWeight: "600" }}
                        />
                    </View>
                    <View style={{ gap: 10 }}>
                        <Text style={{ color: 'white', fontWeight: '600' }}>Password</Text>
                        <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            placeholder="Password"
                            placeholderTextColor="#888"
                            secureTextEntry
                            style={{ backgroundColor: '#2F2F2F', borderRadius: 20, padding: 20, color: "white", fontWeight: "600" }}
                        />
                    </View>
                </KeyboardAvoidingView>
            </View>
            
            <TouchableOpacity style={{ borderRadius: 20, overflow: "hidden" }} onPress={handleUserSignUp}>
                <Text style={{ textAlign: "center", backgroundColor: '#4943FF', padding: 20, fontWeight: '700', color: "white" }}>
                    Create Account
                </Text>
            </TouchableOpacity>

            <View style={{ width: '100%', borderWidth: 1, borderColor: '#3B3B3B' }} />

            <TouchableOpacity onPress={() => { router.replace('/sign-in') }}>
                <Text style={{ color: "white", textAlign: 'center', borderWidth: 1, borderColor: '#3B3B3B', borderRadius: 20, padding: 20 }}>
                    Already have an account?
                </Text>
            </TouchableOpacity>
        </View>
    );
}
