import '@expo/metro-runtime';
import React, { useMemo, useState } from 'react';
import { SafeAreaView, View, ScrollView, Image, Pressable, StyleSheet, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const SCREENS = { HOME: 'HOME', PRODUCT: 'PRODUCT', EXPLORE: 'EXPLORE', BEVERAGES: 'BEVERAGES' };

const assets = {
  homeTop: require('./assets/screens/home_top_content.png'),
  homeLower: require('./assets/screens/home_lower_content.png'),
  homeBar: require('./assets/screens/home_bar_resized.png'),
  product: require('./assets/screens/product_full.png'),
  exploreContent: require('./assets/screens/explore_content.png'),
  exploreBar: require('./assets/screens/explore_bar_active.png'),
  beverages: require('./assets/screens/beverages_content.png'),
};

function Hit({ style, onPress, label }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={[styles.hit, style]} />;
}

function HomeBottomBar({ onExplore }) {
  return (
    <View style={styles.homeBarWrap} pointerEvents="box-none">
      <Image source={assets.homeBar} style={styles.homeBar} resizeMode="stretch" />
      <Hit label="Explore tab" onPress={onExplore} style={{ left: '21%', top: 6, width: '21%', height: 72, borderRadius: 16 }} />
    </View>
  );
}

function ExploreBottomBar({ onShop }) {
  return (
    <View style={styles.exploreBarWrap} pointerEvents="box-none">
      <Image source={assets.exploreBar} style={styles.exploreBar} resizeMode="stretch" />
      <Hit label="Shop tab" onPress={onShop} style={{ left: '3%', top: 8, width: '18%', height: 70, borderRadius: 16 }} />
    </View>
  );
}

function HomeScreen({ onProduct, onExplore }) {
  return (
    <View style={styles.fill}>
      <ScrollView style={styles.fill} contentContainerStyle={{ paddingBottom: 96 }} showsVerticalScrollIndicator={false}>
        <Image source={assets.homeTop} style={styles.homeTop} resizeMode="stretch" />
        <Image source={assets.homeLower} style={styles.homeLower} resizeMode="stretch" />
      </ScrollView>
      <HomeBottomBar onExplore={onExplore} />
      <Hit label="Red Apple card" onPress={onProduct} style={{ left: '50.8%', top: '30.2%', width: '28.4%', height: '14.4%' }} />
      <Hit label="Red Apple plus" onPress={onProduct} style={{ left: '74.8%', top: '39.6%', width: '11%', height: '5.2%', borderRadius: 999 }} />
    </View>
  );
}

function ProductScreen({ quantity, setQuantity, onAddBasket, onBack }) {
  const q = Math.max(1, quantity);
  return (
    <View style={styles.fill}>
      <Image source={assets.product} style={styles.productScreen} resizeMode="stretch" />
      <Hit label="Back to Home" onPress={onBack} style={{ left: '4%', top: '4.6%', width: '10%', height: '6.2%', borderRadius: 999 }} />
      <Hit label="Share" onPress={() => {}} style={{ right: '6%', top: '4.6%', width: '10%', height: '6.2%', borderRadius: 999 }} />

      {/* Cover old broken quantity controls */}
      <View style={styles.productQtyCover} />
      <View style={styles.productQtyRow}>
        <Pressable onPress={() => setQuantity(v => Math.max(1, v - 1))} style={styles.pmBtn}>
          <Text style={styles.minusText}>−</Text>
        </Pressable>
        <View style={styles.productQtyBox}><Text style={styles.productQtyText}>{q}</Text></View>
        <Pressable onPress={() => setQuantity(v => v + 1)} style={styles.pmBtn}>
          <Text style={styles.plusText}>+</Text>
        </Pressable>
      </View>

      <Hit label="Add To Basket" onPress={onAddBasket} style={{ left: '6%', top: '88%', width: '88%', height: '7.2%', borderRadius: 22 }} />
    </View>
  );
}

function ExploreScreen({ onBeverages, onHome }) {
  return (
    <View style={styles.fill}>
      <ScrollView style={styles.fill} contentContainerStyle={{ paddingBottom: 122 }} showsVerticalScrollIndicator={false}>
        <Image source={assets.exploreContent} style={styles.exploreContent} resizeMode="stretch" />
      </ScrollView>
      <ExploreBottomBar onShop={onHome} />
      <Hit label="Beverages card" onPress={onBeverages} style={{ left: '52.8%', top: '61.5%', width: '39%', height: '16%' }} />
    </View>
  );
}

function BeveragesScreen({ onBack, onHome }) {
  return (
    <View style={styles.fill}>
      <ScrollView style={styles.fill} contentContainerStyle={{ paddingBottom: 122 }} showsVerticalScrollIndicator={false}>
        <Image source={assets.beverages} style={styles.full408} resizeMode="stretch" />
      </ScrollView>
      <ExploreBottomBar onShop={onHome} />
      <Hit label="Back to Explore" onPress={onBack} style={{ left: '4.2%', top: '5%', width: '10%', height: '6%', borderRadius: 999 }} />
    </View>
  );
}

export default function App() {
  const [screen, setScreen] = useState(SCREENS.HOME);
  const [quantity, setQuantity] = useState(1);
  const frameStyle = screen === SCREENS.HOME ? styles.frameHome : styles.frameWide;

  const content = useMemo(() => {
    switch (screen) {
      case SCREENS.PRODUCT:
        return <ProductScreen quantity={quantity} setQuantity={setQuantity} onAddBasket={() => setScreen(SCREENS.EXPLORE)} onBack={() => setScreen(SCREENS.HOME)} />;
      case SCREENS.EXPLORE:
        return <ExploreScreen onBeverages={() => setScreen(SCREENS.BEVERAGES)} onHome={() => setScreen(SCREENS.HOME)} />;
      case SCREENS.BEVERAGES:
        return <BeveragesScreen onBack={() => setScreen(SCREENS.EXPLORE)} onHome={() => setScreen(SCREENS.HOME)} />;
      default:
        return <HomeScreen onProduct={() => setScreen(SCREENS.PRODUCT)} onExplore={() => setScreen(SCREENS.EXPLORE)} />;
    }
  }, [screen, quantity]);

  return (
    <SafeAreaView style={styles.page}>
      <StatusBar style="dark" />
      <View style={frameStyle}>{content}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#eef1ef', alignItems: 'center', justifyContent: 'center', padding: 18 },
  frameHome: { width: '100%', maxWidth: 310, height: '100%', maxHeight: 883, backgroundColor: '#fff', borderRadius: 28, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.16, shadowRadius: 18, shadowOffset: { width: 0, height: 10 }, elevation: 10 },
  frameWide: { width: '100%', maxWidth: 408, height: '100%', maxHeight: 883, backgroundColor: '#fff', borderRadius: 28, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.16, shadowRadius: 18, shadowOffset: { width: 0, height: 10 }, elevation: 10 },
  fill: { flex: 1 },
  hit: { position: 'absolute', backgroundColor: 'rgba(83,177,117,0)', zIndex: 30 },
  homeTop: { width: 310, height: 500, alignSelf: 'center' },
  homeLower: { width: 310, height: 390, alignSelf: 'center' },
  homeBarWrap: { position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center', zIndex: 50 },
  homeBar: { width: 310, height: 91 },
  exploreBarWrap: { position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center', zIndex: 50 },
  exploreBar: { width: 408, height: 122 },
  productScreen: { width: 408, height: 883 },
  full408: { width: 408, height: 883 },
  exploreContent: { width: 408, height: 761 },
  productQtyCover: { position: 'absolute', left: '4%', top: '51.5%', width: '34%', height: '7%', backgroundColor: '#fff', borderRadius: 18, zIndex: 10 },
  productQtyRow: { position: 'absolute', left: '4.7%', top: '52.2%', width: '32%', height: '6%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', zIndex: 20 },
  pmBtn: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center', borderRadius: 17 },
  minusText: { fontSize: 28, lineHeight: 28, color: '#b3b3b3', marginTop: -2 },
  plusText: { fontSize: 30, lineHeight: 30, color: '#53B175', marginTop: -3 },
  productQtyBox: { width: 56, height: 42, borderWidth: 1, borderColor: '#e4e4e4', borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  productQtyText: { fontSize: 22, fontWeight: '500', color: '#181725' },
});
