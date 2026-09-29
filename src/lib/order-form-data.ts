export const jewelryTypeIds = ['ring', 'necklace', 'earrings', 'bracelet', 'pendant', 'brooch', 'cufflinks', 'anklet', 'choker'];

export const jewelryTypeImages: Record<string, string> = {
    ring: 'https://i.postimg.cc/zVs51WNX/ring-icon.png',
    necklace: 'https://i.postimg.cc/MvCx8RwZ/necklace-icon.png',
    earrings: 'https://i.postimg.cc/dLbvKdFV/earrings-icon.png',
    bracelet: 'https://i.postimg.cc/1fkPZ6Sz/bracelet-icon.png',
    pendant: 'https://i.postimg.cc/bJp48RBY/diamond-pendant-(1)-(1).png',
    brooch: 'https://i.postimg.cc/6ykwNRKq/brooch-icon.png',
    cufflinks: 'https://i.postimg.cc/hfkgqxnf/pendant-icon.png',
    anklet: 'https://i.postimg.cc/56h1MvJH/anklet-icon.png',
    choker: 'https://i.postimg.cc/RNk9zfBk/choker-icon.png',
};

export const materialData = [
  { id: 'yellow_gold', color: '#FAD6A5' },
  { id: 'white_gold', color: '#E5E4E2' },
  { id: 'rose_gold', color: '#E0B5B5' },
  { id: 'silver', color: '#C0C0C0' },
  { id: 'platinum', color: '#D9D9D9' },
  { id: 'copper', color: '#B87333' },
];

export const materialIds = materialData.map(m => m.id);

export const stoneData = [
  { id: 'diamond', color: '#FFFFFF' },
  { id: 'ruby', color: '#E0115F' },
  { id: 'sapphire', color: '#0F52BA' },
  { id: 'emerald', color: '#50C878' },
  { id: 'amethyst', color: '#9966CC' },
  { id: 'aquamarine', color: '#7FFFD4' },
  { id: 'opal', color: '#F8F8FF' },
  { id: 'pearl', color: '#EAE0C8' },
  { id: 'garnet', color: '#9A2A2A' },
  { id: 'topaz', color: '#FFC87C' },
  { id: 'quartz', color: '#F7F7F7' },
];
