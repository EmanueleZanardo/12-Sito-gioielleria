
export type ProductImage = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  groupInfo: { id: string; name: string; };
};

export type ProductGroup = {
  id: string;
  name: string;
  images: ProductImage[];
  bgColor: {
    start: string;
    end: string;
  };
};

const allProductsOriginal: Record<string, Omit<ProductImage, 'groupInfo'> & { groupInfo: { id: string; name: string; } }> = {
  prod_001: {
    id: 'prod_001',
    description: 'Catena e pendente in argento 925 con punta di quarzo grezzo — montatura artigianale',
    imageUrl: 'https://i.postimg.cc/jS3Xg4zs/Gemini-Generated-Image-5ooedx5ooedx5ooe.png',
    imageHint: 'silver chain with raw quartz point pendant',
    groupInfo: { id: 'group_001', name: 'Pendente punta di quarzo' },
  },
  prod_002: {
    id: 'prod_002',
    description: 'Fascia in argento 925 con finitura a intaglio, realizzata a mano',
    imageUrl: 'https://i.postimg.cc/K8pNqDnr/Gemini-Generated-Image-uirhw7uirhw7uirh.png',
    imageHint: 'hand carved silver band',
    groupInfo: { id: 'group_005', name: 'Fascia effetto intagliato' },
  },
  prod_003: {
    id: 'prod_003',
    description: 'Catena e pendente in argento 925 con punta di quarzo grezzo — montatura artigianale',
    imageUrl: 'https://i.postimg.cc/8C0ZtmNT/Gemini-Generated-Image-36eugs36eugs36eu.png',
    imageHint: 'silver chain with raw quartz point pendant',
    groupInfo: { id: 'group_001', name: 'Pendente punta di quarzo' },
  },
  prod_004: {
    id: 'prod_004',
    description: 'Collana con ciondolo in argento 925 e fetta di quarzo con inclusioni di clorite',
    imageUrl: 'https://i.postimg.cc/YCCRzsmS/Gemini-Generated-Image-4p38yd4p38yd4p38.png',
    imageHint: 'silver necklace with quartz slice and chlorite inclusions',
    groupInfo: { id: 'group_004', name: 'Collana pendente quarzo' },
  },
  prod_005: {
    id: 'prod_005',
    description: 'Collana con pendente in oro 750 e rubino taglio cuore',
    imageUrl: 'https://i.postimg.cc/Dww6PMbF/Gemini-Generated-Image-lr2kymlr2kymlr2k.png',
    imageHint: 'gold pendant with heart cut ruby',
    groupInfo: { id: 'group_002', name: 'Ciondolo rubino' },
  },
  prod_006: {
    id: 'prod_006',
    description: 'Collana con pendente in oro 750 e rubino taglio cuore',
    imageUrl: 'https://i.postimg.cc/0yyn0BJ1/Gemini-Generated-Image-c4uur4c4uur4c4uu.png',
    imageHint: 'gold pendant with heart cut ruby',
    groupInfo: { id: 'group_002', name: 'Ciondolo rubino' },
  },
  prod_007: {
    id: 'prod_007',
    description: 'Catena e pendente in argento 925 con punta di quarzo grezzo — montatura artigianale',
    imageUrl: 'https://i.postimg.cc/bwwg9B2Z/Gemini-Generated-Image-ckrev3ckrev3ckre.png',
    imageHint: 'silver chain with raw quartz point pendant',
    groupInfo: { id: 'group_001', name: 'Pendente punta di quarzo' },
  },
  prod_008: {
    id: 'prod_008',
    description: 'Anello in oro 750 con zaffiro taglio goccia — incisione satinata fatta a mano',
    imageUrl: 'https://i.postimg.cc/htZry19G/Gemini-Generated-Image-cwx29lcwx29lcwx2.png',
    imageHint: 'gold ring with pear cut sapphire',
    groupInfo: { id: 'group_006', name: 'Anello zaffiro' },
  },
  prod_009: {
    id: 'prod_009',
    description: 'Collana con ciondolo in argento 925 e fetta di quarzo con inclusioni di clorite',
    imageUrl: 'https://i.postimg.cc/pLLCJ6nt/Gemini-Generated-Image-fz223lfz223lfz22.png',
    imageHint: 'silver necklace with quartz slice and chlorite inclusions',
    groupInfo: { id: 'group_004', name: 'Collana pendente quarzo' },
  },
  prod_010: {
    id: 'prod_010',
    description: 'Anello in argento 925 con opale etiope taglio cabochon',
    imageUrl: 'https://i.postimg.cc/FR9xWCYH/photo-6005879377222552120-y.jpg',
    imageHint: 'silver ring with ethiopian opal cabochon',
    groupInfo: { id: 'group_003', name: 'Anello opale etiope' },
  },
  prod_011: {
    id: 'prod_011',
    description: 'Collana con pendente in oro 750 e rubino taglio cuore',
    imageUrl: 'https://i.postimg.cc/QdYb4Jp7/Gemini-Generated-Image-waufz6waufz6wauf.png',        
    imageHint: 'gold pendant with heart cut ruby',
    groupInfo: { id: 'group_002', name: 'Ciondolo rubino' },
  },
  prod_012: {
    id: 'prod_012',
    description: 'Anello in argento 925 con opale etiope taglio cabochon',
    imageUrl: 'https://i.postimg.cc/7ZtVsngb/Gemini-Generated-Image-ppnciqppnciqppnc.png',
    imageHint: 'silver ring with ethiopian opal cabochon',
    groupInfo: { id: 'group_003', name: 'Anello opale etiope' },
  },
  prod_013: {
    id: 'prod_013',
    description: 'Fascia in argento 925 con finitura a intaglio, realizzata a mano',
    imageUrl: 'https://i.postimg.cc/G2cj7g4c/photo-6005879377222552124-y.jpg',
    imageHint: 'hand carved silver band',
    groupInfo: { id: 'group_005', name: 'Fascia effetto intagliato' },
  },
  prod_014: {
    id: 'prod_014',
    description: 'Anello in argento 925 con opale etiope taglio cabochon',
    imageUrl: 'https://i.postimg.cc/jS3Xg4zD/Gemini-Generated-Image-jrfgvljrfgvljrfg.png',
    imageHint: 'silver ring with ethiopian opal cabochon',
    groupInfo: { id: 'group_003', name: 'Anello opale etiope' },
  },
  prod_015: {
    id: 'prod_015',
    description: 'Fascia in argento 925 con finitura a intaglio, realizzata a mano',
    imageUrl: 'https://i.postimg.cc/NMgxJCKs/photo-6005879377222552125-y.jpg',
    imageHint: 'hand carved silver band',
    groupInfo: { id: 'group_005', name: 'Fascia effetto intagliato' },
  },
  prod_016: {
    id: 'prod_016',
    description: 'Collana con ciondolo in argento 925 e fetta di quarzo con inclusioni di clorite',
    imageUrl: 'https://i.postimg.cc/YCCRzsmM/Gemini-Generated-Image-9d3b8t9d3b8t9d3b.png',
    imageHint: 'silver necklace with quartz slice and chlorite inclusions',
    groupInfo: { id: 'group_004', name: 'Collana pendente quarzo' },
  },
  prod_017: {
    id: 'prod_017',
    description: 'Anello in oro 750 con zaffiro taglio goccia — incisione satinata fatta a mano',
    imageUrl: 'https://i.postimg.cc/cHsc9kvg/photo-6005879377222552127-y.jpg',
    imageHint: 'gold ring with pear cut sapphire',
    groupInfo: { id: 'group_006', name: 'Anello zaffiro' },
  },
  prod_018: {
    id: 'prod_018',
    description: 'Anello in oro 750 con zaffiro taglio goccia — incisione satinata fatta a mano',
    imageUrl: 'https://i.postimg.cc/DZ2cjpS0/photo-6005879377222552126-y.jpg',
    imageHint: 'gold ring with pear cut sapphire',
    groupInfo: { id: 'group_006', name: 'Anello zaffiro' },
  },
  prod_019: {
    id: 'prod_019',
    description: 'Fedi in oro 750 con finitura martellata a mano',
    imageUrl: 'https://i.postimg.cc/HkpNxLcF/photo-2026-04-24-07-41-22.jpg',
    imageHint: 'hand hammered gold wedding rings',
    groupInfo: { id: 'group_007', name: 'Fedi oro battuto' },
  },
  prod_020: {
    id: 'prod_020',
    description: 'Fedi in oro 750 con finitura martellata a mano',
    imageUrl: 'https://i.postimg.cc/dVqf10kp/photo-2026-04-24-07-42-21.jpg',
    imageHint: 'hand hammered gold wedding rings',
    groupInfo: { id: 'group_007', name: 'Fedi oro battuto' },
  },
  prod_021: {
    id: 'prod_021',
    description: 'Fedi in oro 750 con finitura martellata a mano',
    imageUrl: 'https://i.postimg.cc/vZQKBmgj/photo-2026-04-24-07-44-56.jpg',
    imageHint: 'hand hammered gold wedding rings',
    groupInfo: { id: 'group_007', name: 'Fedi oro battuto' },
  },
};

const orderedProductIds = [
  'prod_001', 'prod_005', 'prod_012', 'prod_009', 'prod_013', 'prod_017', 'prod_019',
  'prod_007', 'prod_006', 'prod_014', 'prod_016', 'prod_002', 'prod_018', 'prod_020',
  'prod_003', 'prod_011', 'prod_010', 'prod_004', 'prod_015', 'prod_008', 'prod_021',
];

export const orderedProducts: ProductImage[] = orderedProductIds.map(id => allProductsOriginal[id]);

// This is the old data structure, keeping it here for reference but it's not used anymore.
export type Product = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};
export const products: Product[] = [];
