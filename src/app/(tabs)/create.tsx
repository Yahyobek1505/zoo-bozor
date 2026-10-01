import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { CATEGORIES_DATA, UZBEKISTAN_REGIONS, ZooColors } from '@/constants/zooTheme';
import { AnimalGender, Listing, PetCategory } from '@/types';
import { useListingStore } from '@/store/useListingStore';

export default function CreateListingScreen() {
  const router = useRouter();
  const { addListing } = useListingStore();

  const [category, setCategory] = useState<PetCategory>('cats');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isFree, setIsFree] = useState(false);
  const [isNegotiable, setIsNegotiable] = useState(true);
  const [isUrgent, setIsUrgent] = useState(false);
  
  // Animal specific attributes
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<AnimalGender>('male');
  const [isVaccinated, setIsVaccinated] = useState(true);
  const [hasPassport, setHasPassport] = useState(false);
  const [region, setRegion] = useState(UZBEKISTAN_REGIONS[1]); // Toshkent shahri

  // Sample default images for demo
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=800',
  ]);

  const isAnimal = ['cats', 'dogs', 'birds', 'fish', 'rodents'].includes(category);

  const handleAddSampleImage = () => {
    const samples = [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800',
      'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?q=80&w=800',
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=800',
      'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?q=80&w=800',
    ];
    const nextImg = samples[Math.floor(Math.random() * samples.length)];
    if (images.length < 6) {
      setImages([...images, nextImg]);
    } else {
      Alert.alert('Eslatma', 'Maksimal 6 ta rasm yuklash mumkin');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      Alert.alert('Xatolik', 'Iltimos, e\'lon sarlavhasini kiriting');
      return;
    }
    if (!isFree && (!price || isNaN(Number(price)))) {
      Alert.alert('Xatolik', 'Iltimos, narxni to\'g\'ri kiriting');
      return;
    }

    const catObj = CATEGORIES_DATA.find((c) => c.id === category);

    const newAd: Listing = {
      id: `zoo-new-${Date.now()}`,
      title,
      category,
      categoryName: catObj ? catObj.name : 'Jonivorlar',
      breed: breed || undefined,
      age: age || undefined,
      gender: isAnimal ? gender : undefined,
      price: isFree ? 0 : Number(price),
      currency: 'UZS',
      isFree,
      isNegotiable,
      isUrgent,
      isVaccinated: isAnimal ? isVaccinated : undefined,
      hasPassport: isAnimal ? hasPassport : undefined,
      location: {
        region,
        district: 'Markaziy tuman',
      },
      images: images.length > 0 ? images : [
        'https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=800'
      ],
      description: description || 'Batafsil ma\'lumot telefon orqali beriladi.',
      seller: {
        id: 'me',
        name: 'Mening Profilim',
        phone: '+998 90 123 45 67',
        rating: 5.0,
        reviewsCount: 1,
        joinedDate: 'Bugun',
        isVerified: true,
        type: 'individual',
      },
      createdAt: 'Hozirgina',
      viewsCount: 1,
      favoritesCount: 0,
      status: 'active',
    };

    addListing(newAd);
    Alert.alert('Muvaffaqiyatli', 'E\'loningiz ZOO BOZOR ga joylashtirildi!', [
      {
        text: 'E\'lonni ko\'rish',
        onPress: () => {
          router.push({
            pathname: '/listing/[id]',
            params: { id: newAd.id },
          });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Yangi e'lon berish</Text>
      </View>

      <ScrollView
        style={styles.form}
        contentContainerStyle={styles.formContent}
        showsVerticalScrollIndicator={false}>
        
        {/* Step 1: Category selection */}
        <Text style={styles.label}>Kategoriyani tanlang *</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catScroll}>
          {CATEGORIES_DATA.filter((c) => c.id !== 'all').map((cat) => {
            const isSelected = category === cat.id;
            return (
              <Pressable
                key={cat.id}
                onPress={() => setCategory(cat.id as PetCategory)}
                style={[
                  styles.catChip,
                  isSelected && styles.catChipSelected,
                ]}>
                <Text
                  style={[
                    styles.catChipText,
                    isSelected && styles.catChipTextSelected,
                  ]}>
                  {cat.name}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Step 2: Photo Upload Gallery */}
        <Text style={styles.label}>Rasmlar (kamida 1 ta) *</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.photoRow}>
          {images.map((uri, index) => (
            <View key={index} style={styles.photoWrapper}>
              <Image source={{ uri }} style={styles.photoThumb} />
              <Pressable
                onPress={() => handleRemoveImage(index)}
                style={styles.removePhotoBtn}>
                <Ionicons name="close" size={14} color="#FFFFFF" />
              </Pressable>
            </View>
          ))}

          {images.length < 6 && (
            <Pressable
              onPress={handleAddSampleImage}
              style={styles.addPhotoBtn}>
              <Ionicons name="camera-outline" size={26} color={ZooColors.primary} />
              <Text style={styles.addPhotoText}>+ Rasm qo'shish</Text>
            </Pressable>
          )}
        </ScrollView>

        {/* Step 3: Title & Description */}
        <Text style={styles.label}>E'lon sarlavhasi *</Text>
        <TextInput
          style={styles.input}
          placeholder="Masalan: Shotland mushukchasi, 2 oylik"
          placeholderTextColor="#94A3B8"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Tavsif (xarakteri, odatlari, holati)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Jonivor haqida batafsil ma'lumot bering..."
          placeholderTextColor="#94A3B8"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        {/* Step 4: Animal Specific details */}
        {isAnimal && (
          <View style={styles.animalBox}>
            <Text style={styles.boxTitle}>Hayvon ma'lumotlari</Text>

            <View style={styles.row}>
              <View style={styles.flex1}>
                <Text style={styles.subLabel}>Zoti (Porodasi)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Masalan: Scottish Fold"
                  placeholderTextColor="#94A3B8"
                  value={breed}
                  onChangeText={setBreed}
                />
              </View>
              <View style={styles.flex1}>
                <Text style={styles.subLabel}>Yoshi</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Masalan: 3 oylik"
                  placeholderTextColor="#94A3B8"
                  value={age}
                  onChangeText={setAge}
                />
              </View>
            </View>

            {/* Gender Toggle */}
            <Text style={styles.subLabel}>Jinsi</Text>
            <View style={styles.genderRow}>
              <Pressable
                onPress={() => setGender('male')}
                style={[
                  styles.genderBtn,
                  gender === 'male' && styles.genderBtnActive,
                ]}>
                <Ionicons
                  name="male"
                  size={16}
                  color={gender === 'male' ? '#FFFFFF' : '#3B82F6'}
                />
                <Text
                  style={[
                    styles.genderText,
                    gender === 'male' && styles.genderTextActive,
                  ]}>
                  Erkak
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setGender('female')}
                style={[
                  styles.genderBtn,
                  gender === 'female' && styles.genderBtnActivePink,
                ]}>
                <Ionicons
                  name="female"
                  size={16}
                  color={gender === 'female' ? '#FFFFFF' : '#EC4899'}
                />
                <Text
                  style={[
                    styles.genderText,
                    gender === 'female' && styles.genderTextActive,
                  ]}>
                  Urg'ochi
                </Text>
              </Pressable>
            </View>

            {/* Medical status */}
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Vaksina qilingan (Emlangan)</Text>
              <Switch
                value={isVaccinated}
                onValueChange={setIsVaccinated}
                trackColor={{ false: '#E2E8F0', true: ZooColors.primary }}
              />
            </View>

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Veterinariya pasporti bor</Text>
              <Switch
                value={hasPassport}
                onValueChange={setHasPassport}
                trackColor={{ false: '#E2E8F0', true: ZooColors.primary }}
              />
            </View>
          </View>
        )}

        {/* Step 5: Pricing */}
        <Text style={styles.label}>Narx va to'lov</Text>
        
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Tekinga beriladi (Mehrli qo'llarga)</Text>
          <Switch
            value={isFree}
            onValueChange={setIsFree}
            trackColor={{ false: '#E2E8F0', true: '#8B5CF6' }}
          />
        </View>

        {!isFree && (
          <View style={styles.priceRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Narxi (so'm)"
              placeholderTextColor="#94A3B8"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
            <View style={styles.currencyBadge}>
              <Text style={styles.currencyText}>UZS (so'm)</Text>
            </View>
          </View>
        )}

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Narx kelishiladi</Text>
          <Switch
            value={isNegotiable}
            onValueChange={setIsNegotiable}
            trackColor={{ false: '#E2E8F0', true: ZooColors.primary }}
          />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Shoshilinch e'lon (TOPga chiqadi)</Text>
          <Switch
            value={isUrgent}
            onValueChange={setIsUrgent}
            trackColor={{ false: '#E2E8F0', true: ZooColors.danger }}
          />
        </View>

        {/* Step 6: Region */}
        <Text style={styles.label}>Hudud</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.regionScroll}>
          {UZBEKISTAN_REGIONS.filter((r) => r !== 'Barcha hududlar').map(
            (reg) => {
              const isSelected = region === reg;
              return (
                <Pressable
                  key={reg}
                  onPress={() => setRegion(reg)}
                  style={[
                    styles.regChip,
                    isSelected && styles.regChipSelected,
                  ]}>
                  <Text
                    style={[
                      styles.regChipText,
                      isSelected && styles.regChipTextSelected,
                    ]}>
                    {reg}
                  </Text>
                </Pressable>
              );
            }
          )}
        </ScrollView>

        {/* Submit Button */}
        <Pressable onPress={handleSubmit} style={styles.submitBtn}>
          <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
          <Text style={styles.submitBtnText}>E'lonni joylashtirish</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: ZooColors.dark,
  },
  form: {
    flex: 1,
  },
  formContent: {
    padding: 16,
    paddingBottom: 40,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: ZooColors.dark,
    marginTop: 14,
    marginBottom: 8,
  },
  subLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: ZooColors.darkSecondary,
    marginBottom: 6,
  },
  catScroll: {
    gap: 8,
    paddingBottom: 4,
  },
  catChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  catChipSelected: {
    backgroundColor: ZooColors.primary,
    borderColor: ZooColors.primary,
  },
  catChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: ZooColors.darkSecondary,
  },
  catChipTextSelected: {
    color: '#FFFFFF',
  },
  photoRow: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 6,
  },
  photoWrapper: {
    position: 'relative',
    width: 90,
    height: 90,
    borderRadius: 12,
    overflow: 'hidden',
  },
  photoThumb: {
    width: '100%',
    height: '100%',
  },
  removePhotoBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoBtn: {
    width: 90,
    height: 90,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: ZooColors.primary,
    borderStyle: 'dashed',
    backgroundColor: ZooColors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  addPhotoText: {
    fontSize: 11,
    fontWeight: '600',
    color: ZooColors.primaryDark,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: ZooColors.dark,
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
  animalBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 14,
    marginTop: 14,
  },
  boxTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: ZooColors.dark,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  flex1: {
    flex: 1,
  },
  genderRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  genderBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  genderBtnActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  genderBtnActivePink: {
    backgroundColor: '#EC4899',
    borderColor: '#EC4899',
  },
  genderText: {
    fontSize: 13,
    fontWeight: '600',
    color: ZooColors.darkSecondary,
  },
  genderTextActive: {
    color: '#FFFFFF',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F1F5F9',
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: ZooColors.dark,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 6,
  },
  currencyBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
  },
  currencyText: {
    fontSize: 13,
    fontWeight: '700',
    color: ZooColors.darkSecondary,
  },
  regionScroll: {
    gap: 8,
    paddingBottom: 6,
  },
  regChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  regChipSelected: {
    backgroundColor: ZooColors.primary,
    borderColor: ZooColors.primary,
  },
  regChipText: {
    fontSize: 12,
    fontWeight: '500',
    color: ZooColors.darkSecondary,
  },
  regChipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  submitBtn: {
    backgroundColor: ZooColors.primary,
    borderRadius: 14,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 24,
    shadowColor: ZooColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
