import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, SafeAreaView, RefreshControl, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { auth } from '@/config/firebase';
import { Product } from '@/constants/product';

const API_URL = 'https://fakestoreapi.com/products'; 

const Index = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[] | []>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setLoading(false);
            if (!user) {
                navigation.replace('/sign-in');
            }
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        fetchProducts();
    }, [page]);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${API_URL}?limit=${page * 3}`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        setPage(1);
        await fetchProducts();
        setRefreshing(false);
    };

    const handleLogOut=async()=>{
        try {
            await signOut(auth);
            navigation.replace('/sign-in'); // Redirect user to sign-in screen
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const filteredProducts = searchQuery.trim()
        ? products.filter(product =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : products;

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingVertical: 20 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ width: '100%', padding: 10, backgroundColor: '#F6F6F6', paddingVertical: 20,flexDirection:'row',alignItems:'center'}}>
                    <TextInput
                        placeholder="Search items"
                        value={searchQuery}
                        onChangeText={setSearchQuery} // ✅ Search updates instantly
                        style={{
                            borderRadius: 10,
                            backgroundColor: '#FFF',
                            padding: 10,
                            paddingVertical: 15,
                            fontWeight: '600',
                            flex:1
                        }}
                        placeholderTextColor="#CDCDCD"
                    />
                    <TouchableOpacity style={{paddingHorizontal:20,borderRadius:10,backgroundColor:"#FF4B4B",paddingVertical: 15}}>
                        <Text style={{color:'white',fontWeight:'600'}}>Logout</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, backgroundColor: '#F6F6F6', padding: 10 }}>
                    <FlatList
                        data={filteredProducts} // ✅ Search filtering applied here
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={{ marginBottom: 20, padding: 10, backgroundColor: 'white', borderRadius: 10, elevation: 2, height: 500 }} onPress={()=>{navigation.push(`/${item.id}`)}}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={{ uri: item.image }} style={{ width: 220, height: 220, borderRadius: 10 }} />
                                </View>
                                <View style={{ borderWidth: 1, borderColor: '#EBEBEB' }} />
                                <View style={{ padding: 10, paddingVertical: 20, gap: 20 }}>
                                    <Text style={{ color: '#4444FF', fontWeight: 'bold', fontSize: 20 }}>${item.price}</Text>
                                    <Text style={{ marginTop: 5 }}>{item.title}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.5}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                        }
                    />
                </View>
            </SafeAreaView>
        </View>
    );
};

export default Index;
