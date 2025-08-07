import type {
    User, Genre, Movie,
    Cinema, Screen, Seat,
    TimeSlot, MovieSchedule,
    Event, Membership, SoldInvoice, Ticket, FnbItem, SoldFnb, SeatType
} from '../../types/type'

export const users: User[] = [
    {
        id: 1,
        username: 'admin',
        email: 'admin@gmail.com',
        password: '123456',
        phone: '0123456789',
        role: 'admin',
        tier: 'member',
        status: 'active',
        createdAt: '2025-07-01T09:00:00Z'
    },
    {
        id: 2,
        username: 'staff01',
        email: 'staff@gmail.com',
        password: '123456',
        phone: '0987654321',
        role: 'staff',
        tier: 'member',
        status: 'active',
        createdAt: '2025-07-02T10:00:00Z'
    },
    {
        id: 3,
        username: 'kaydi',
        email: 'kdung@gmail.com',
        password: '123456',
        phone: '0912345678',
        role: 'member',
        tier: 'vip',
        status: 'active',
        createdAt: '2025-07-03T11:00:00Z'
    }
]

export const memberships: Membership[] = [
    {
        id: 1,
        userId: 1,
        tier: 'member',
        points: 250,
        totalSpent: 1200000,
        upgradedAt: '2025-07-01T09:00:00Z'
    },
    {
        id: 2,
        userId: 2,
        tier: 'member',
        points: 100,
        totalSpent: 500000,
        upgradedAt: '2025-07-02T10:00:00Z'
    },
    {
        id: 3,
        userId: 3,
        tier: 'vip',
        points: 320,
        totalSpent: 1800000,
        upgradedAt: '2025-07-03T11:00:00Z'
    }
]

export const genres: Genre[] = [
    {
        id: 1,
        translations: [
            {
                locale: 'en',
                name: 'Action'
            },
            {
                locale: 'vi',
                name: 'Hành động'
            }]
    },
    {
        id: 2,
        translations: [
            {
                locale: 'en',
                name: 'Drama'
            },
            {
                locale: 'vi',
                name: 'Tâm lý'
            }]
    },
    {
        id: 3,
        translations: [
            {
                locale: 'en',
                name: 'Sci-Fi'
            },
            {
                locale: 'vi',
                name: 'Khoa học viễn tưởng'
            }]
    },
    {
        id: 4,
        translations: [
            {
                locale: 'en',
                name: 'Comedy'
            },
            {
                locale: 'vi',
                name: 'Hài'
            }]
    },
    {
        id: 5,
        translations: [
            {
                locale: 'en',
                name: 'Thriller'
            },
            {
                locale: 'vi',
                name: 'Hồi hộp'
            }]
    },
    {
        id: 6,
        translations: [
            {
                locale: 'en',
                name: 'Romance'
            },
            {
                locale: 'vi',
                name: 'Lãng mạn'
            }]
    },
    {
        id: 7,
        translations: [
            {
                locale: 'en',
                name: 'Horror'
            },
            {
                locale: 'vi',
                name: 'Kinh dị'
            }]
    },
    {
        id: 8,
        translations: [
            {
                locale: 'en',
                name: 'Fantasy'
            },
            {
                locale: 'vi',
                name: 'Giả tưởng'
            }]
    },
    {
        id: 9,
        translations: [
            {
                locale: 'en',
                name: 'Mystery'
            },
            {
                locale: 'vi',
                name: 'Bí ẩn'
            }]
    },
    {
        id: 10,
        translations: [
            {
                locale: 'en',
                name: 'Animation'
            },
            {
                locale: 'vi',
                name: 'Hoạt hình'
            }]
    },
    {
        id: 11,
        translations: [
            {
                locale: 'en',
                name: 'Adventure'
            },
            {
                locale: 'vi',
                name: 'Phiêu lưu'
            }]
    },
    {
        id: 12,
        translations: [
            {
                locale: 'en',
                name: 'Crime'
            },
            {
                locale: 'vi',
                name: 'Tội phạm'
            }]
    },
    {
        id: 13,
        translations: [
            {
                locale: 'en',
                name: 'Documentary'
            },
            {
                locale: 'vi',
                name: 'Tài liệu'
            }]
    },
    {
        id: 14,
        translations: [
            {
                locale: 'en',
                name: 'Family'
            },
            {
                locale: 'vi',
                name: 'Gia đình'
            }]
    },
    {
        id: 15,
        translations: [
            {
                locale: 'en',
                name: 'Musical'
            },
            {
                locale: 'vi',
                name: 'Ca nhạc'
            }]
    },
    {
        id: 16,
        translations: [
            {
                locale: 'en',
                name: 'War'
            },
            {
                locale: 'vi',
                name: 'Chiến tranh'
            }]
    }
]

export const movies: Movie[] = [
    {
        id: 1,
        code: 'MV1',
        translations: [
            {
                locale: 'en',
                name: 'Dune: Part Two',
                brief: 'Paul Atreides unites with the Fremen to seek revenge.',
                description: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.'
            },
            {
                locale: 'vi',
                name: 'Hành Tinh Cát: Phần Hai',
                brief: 'Paul Atreides hợp nhất với người Fremen để báo thù.',
                description: 'Paul Atreides hợp nhất với Chani và người Fremen trên con đường báo thù những kẻ đã hủy hoại gia đình anh. Đối mặt với sự lựa chọn giữa tình yêu của đời mình và số phận của vũ trụ, anh cố gắng ngăn chặn một tương lai khủng khiếp mà chỉ anh mới có thể thấy trước.'
            }
        ],
        genres: [1, 2, 3, 11],
        duration: 166,
        posterImg: '/posters/MV1.jpg',
        trailer: 'https://www.youtube.com/watch?v=Way9Dexny3w',
        releaseDate: '2024-03-01',
        status: 'now_showing',
        directors: ['Denis Villeneuve'],
        casts: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Austin Butler'],
        ratings: 4.5
    },
    {
        id: 2,
        code: 'MV2',
        translations: [
            {
                locale: 'en',
                name: 'Spider-Man: No Way Home',
                brief: 'Peter Parker faces villains from other universes.',
                description: 'With Spider-Man\'s identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.'
            },
            {
                locale: 'vi',
                name: 'Người Nhện: Không Còn Nhà',
                brief: 'Peter Parker đối mặt với các ác nhân từ đa vũ trụ.',
                description: 'Khi danh tính của Người Nhện bị tiết lộ, Peter đã tìm đến Doctor Strange để nhờ giúp đỡ. Nhưng một câu thần chú sai lầm đã mở ra cánh cửa cho những kẻ thù nguy hiểm từ các thế giới khác, buộc Peter phải khám phá ý nghĩa thực sự của việc trở thành Người Nhện.'
            }
        ],
        genres: [1, 3, 11, 8],
        duration: 148,
        posterImg: '/posters/MV2.jpg',
        trailer: 'https://www.youtube.com/watch?v=JfVOs4VSpmA',
        releaseDate: '2021-12-17',
        status: 'now_showing',
        directors: ['Jon Watts'],
        casts: ['Tom Holland', 'Zendaya', 'Benedict Cumberbatch', 'Willem Dafoe'],
        ratings: 4.5
    },
    {
        id: 3,
        code: 'MV3',
        translations: [
            {
                locale: 'en',
                name: 'The Fantastic Four',
                brief: 'Marvel\'s first family of superheroes gets their powers.',
                description: 'Marvel\'s first family of superheroes, Reed Richards, Sue Storm, Johnny Storm, and Ben Grimm, gain extraordinary abilities after a cosmic radiation incident during a space mission.'
            },
            {
                locale: 'vi',
                name: 'Bộ Tứ Siêu Đẳng',
                brief: 'Gia đình siêu anh hùng đầu tiên của Marvel nhận được sức mạnh.',
                description: 'Gia đình siêu anh hùng đầu tiên của Marvel, bao gồm Reed Richards, Sue Storm, Johnny Storm và Ben Grimm, nhận được những khả năng phi thường sau một sự cố bức xạ vũ trụ trong một nhiệm vụ không gian.'
            }
        ],
        genres: [1, 3, 11],
        duration: 140,
        posterImg: '/posters/MV3.jpg',
        trailer: 'https://www.youtube.com/watch?v=18QQWa5MEcs',
        releaseDate: '2025-07-25',
        status: 'now_showing',
        directors: ['Matt Shakman'],
        casts: ['Pedro Pascal', 'Vanessa Kirby', 'Joseph Quinn', 'Ebon Moss-Bachrach'],
        ratings: 4.5
    },
    {
        id: 4,
        code: 'MV4',
        translations: [
            {
                locale: 'en',
                name: 'Godzilla x Kong: The New Empire',
                brief: 'Godzilla and Kong team up against a new threat.',
                description: 'Two ancient titans, Godzilla and Kong, clash in an epic battle as humans unravel their intertwined origins and connection to Skull Island\'s mysteries.'
            },
            {
                locale: 'vi',
                name: 'Godzilla x Kong: Đế Chế Mới',
                brief: 'Godzilla và Kong hợp sức chống lại một mối đe dọa mới.',
                description: 'Hai titan cổ đại, Godzilla và Kong, đối đầu trong một trận chiến hoành tráng khi con người khám phá ra nguồn gốc và mối liên hệ của chúng với những bí ẩn của Đảo Đầu Lâu.'
            }
        ],
        genres: [1, 3, 5],
        duration: 115,
        posterImg: '/posters/MV4.webp',
        trailer: 'https://www.youtube.com/watch?v=lV1OOlGwExM',
        releaseDate: '2024-03-29',
        status: 'now_showing',
        directors: ['Adam Wingard'],
        casts: ['Rebecca Hall', 'Brian Tyree Henry', 'Dan Stevens'],
        ratings: 4.5
    },
    {
        id: 5,
        code: 'MV5',
        translations: [
            {
                locale: 'en',
                name: 'Avatar 3',
                brief: 'Jake Sully and Neytiri\'s family explore new regions of Pandora.',
                description: 'The next installment in the Avatar saga continues the journey of Jake Sully and Neytiri\'s family, exploring new regions of Pandora and facing new threats.'
            },
            {
                locale: 'vi',
                name: 'Avatar 3',
                brief: 'Gia đình Jake Sully và Neytiri khám phá những vùng đất mới của Pandora.',
                description: 'Phần tiếp theo trong thiên anh hùng ca Avatar tiếp tục cuộc hành trình của gia đình Jake Sully và Neytiri, khám phá những vùng đất mới của Pandora và đối mặt với những mối đe dọa mới.'
            }
        ],
        genres: [3, 11, 8],
        duration: 190,
        posterImg: '/posters/MV5.webp',
        trailer: 'https://www.youtube.com/watch?v=9cGDhDB7898',
        releaseDate: '2025-12-19',
        status: 'now_showing',
        directors: ['James Cameron'],
        casts: ['Sam Worthington', 'Zoe Saldaña', 'Sigourney Weaver', 'Michelle Yeoh'],
        ratings: 4.5
    },
    {
        id: 6,
        code: 'MV6',
        translations: [
            {
                locale: 'en',
                name: 'Oppenheimer',
                brief: 'The story of the man who developed the atomic bomb.',
                description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.'
            },
            {
                locale: 'vi',
                name: 'Oppenheimer',
                brief: 'Câu chuyện về người đàn ông đã phát triển bom nguyên tử.',
                description: 'Câu chuyện về nhà khoa học người Mỹ J. Robert Oppenheimer và vai trò của ông trong việc phát triển bom nguyên tử.'
            }
        ],
        genres: [2, 16],
        duration: 180,
        posterImg: '/posters/MV6.jpg',
        trailer: 'https://www.youtube.com/watch?v=uYPbbksJxIg',
        releaseDate: '2023-07-21',
        status: 'now_showing',
        directors: ['Christopher Nolan'],
        casts: ['Cillian Murphy', 'Emily Blunt', 'Matt Damon', 'Robert Downey Jr.'],
        ratings: 4.5
    },
    {
        id: 7,
        code: 'MV7',
        translations: [
            {
                locale: 'en',
                name: 'Everything Everywhere All at Once',
                brief: 'An aging Chinese immigrant is swept up in an insane adventure.',
                description: 'An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes connecting with the lives she could have led.'
            },
            {
                locale: 'vi',
                name: 'Cuộc Chiến Đa Vũ Trụ',
                brief: 'Một phụ nữ nhập cư gốc Hoa bị cuốn vào một cuộc phiêu lưu điên rồ.',
                description: 'Một phụ nữ nhập cư gốc Hoa bị cuốn vào một cuộc phiêu lưu điên rồ, nơi chỉ có bà mới có thể cứu thế giới bằng cách khám phá các vũ trụ khác, kết nối với những cuộc đời mà bà có thể đã sống.'
            }
        ],
        genres: [1, 4, 3, 11],
        duration: 139,
        posterImg: '/posters/MV7.jpg',
        trailer: 'https://www.youtube.com/watch?v=wxN1T1uxQ2g',
        releaseDate: '2022-04-08',
        status: 'now_showing',
        directors: ['Daniel Kwan', 'Daniel Scheinert'],
        casts: ['Michelle Yeoh', 'Ke Huy Quan', 'Stephanie Hsu', 'Jamie Lee Curtis'],
        ratings: 4.5
    },
    {
        id: 8,
        code: 'MV8',
        translations: [
            {
                locale: 'en',
                name: 'Top Gun: Maverick',
                brief: 'Pete "Maverick" Mitchell is back to train a new generation of pilots.',
                description: 'After more than thirty years of service as one of the Navy\'s top aviators, Pete "Maverick" Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him.'
            },
            {
                locale: 'vi',
                name: 'Phi Công Siêu Đẳng Maverick',
                brief: 'Pete "Maverick" Mitchell trở lại để huấn luyện một thế hệ phi công mới.',
                description: 'Sau hơn ba mươi năm phục vụ với tư cách là một trong những phi công hàng đầu của Hải quân, Pete "Maverick" Mitchell đã trở lại, vượt qua giới hạn với tư cách là một phi công thử nghiệm can đảm và né tránh việc thăng cấp có thể khiến anh phải "ngừng bay".'
            }
        ],
        genres: [1, 2],
        duration: 130,
        posterImg: '/posters/MV8.jpg',
        trailer: 'https://www.youtube.com/watch?v=qSqVVswa420',
        releaseDate: '2022-05-27',
        status: 'now_showing',
        directors: ['Joseph Kosinski'],
        casts: ['Tom Cruise', 'Miles Teller', 'Jennifer Connelly', 'Jon Hamm'],
        ratings: 4.5
    },
    {
        id: 9,
        code: 'MV9',
        translations: [
            {
                locale: 'en',
                name: 'Joker: Folie à Deux',
                brief: 'A musical sequel following Arthur Fleck and Harley Quinn.',
                description: 'The sequel to the 2019 film "Joker" follows Arthur Fleck at Arkham Asylum, where he meets and forms a twisted relationship with psychiatrist Dr. Harleen Quinzel.'
            },
            {
                locale: 'vi',
                name: 'Joker: Điên Có Đôi',
                brief: 'Phần tiếp theo nhạc kịch về Arthur Fleck và Harley Quinn.',
                description: 'Phần tiếp theo của bộ phim "Joker" năm 2019 theo chân Arthur Fleck tại Viện tâm thần Arkham, nơi anh gặp gỡ và hình thành mối quan hệ lệch lạc với bác sĩ tâm lý Harleen Quinzel.'
            }
        ],
        genres: [2, 12, 15],
        duration: 122,
        posterImg: '/posters/MV9.webp',
        trailer: 'https://www.youtube.com/watch?v=_OKAwz2MsJs',
        releaseDate: '2024-10-04',
        status: 'now_showing',
        directors: ['Todd Phillips'],
        casts: ['Joaquin Phoenix', 'Lady Gaga', 'Zazie Beetz', 'Brendan Gleeson'],
        ratings: 4.5
    },
    {
        id: 10,
        code: 'MV10',
        translations: [
            {
                locale: 'en',
                name: 'Captain America: Brave New World',
                brief: 'Sam Wilson grapples with his new role as Captain America.',
                description: 'Sam Wilson, now wielding the shield and mantle of Captain America, must confront a new world order and face a threat that challenges everything he stands for.'
            },
            {
                locale: 'vi',
                name: 'Captain America: Thế Giới Mới Tươi Đẹp',
                brief: 'Sam Wilson vật lộn với vai trò mới là Captain America.',
                description: 'Sam Wilson, giờ đây nắm giữ chiếc khiên và danh hiệu Captain America, phải đối mặt với một trật tự thế giới mới và một mối đe dọa thách thức mọi thứ mà anh đại diện.'
            }
        ],
        genres: [1, 3, 11],
        duration: 150,
        posterImg: '/posters/MV10.jpg',
        trailer: 'https://www.youtube.com/watch?v=1pHDWnXmK7Y',
        releaseDate: '2025-02-14',
        status: 'ended',
        directors: ['Julius Onah'],
        casts: ['Anthony Mackie', 'Harrison Ford', 'Danny Ramirez', 'Tim Blake Nelson'],
        ratings: 4.5
    },
    {
        id: 11,
        code: 'MV11',
        translations: [
            {
                locale: 'en',
                name: 'Inside Out 2',
                brief: 'Riley\'s mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions!',
                description: 'Follow Riley, in her teenage years, encountering new emotions like Anxiety, Envy, Ennui, and Embarrassment. The original emotions must find a way to work with the newcomers to help Riley navigate the challenges of growing up.'
            },
            {
                locale: 'vi',
                name: 'Những Mảnh Ghép Cảm Xúc 2',
                brief: 'Trụ sở chính trong tâm trí Riley bất ngờ bị phá dỡ để nhường chỗ cho những Cảm Xúc mới!',
                description: 'Theo chân Riley ở tuổi thiếu niên, đối mặt với những cảm xúc mới như Lo Âu, Ghen Tị, Chán Nản và Xấu Hổ. Các cảm xúc ban đầu phải tìm cách hợp tác với những người mới đến để giúp Riley vượt qua những thử thách của tuổi trưởng thành.'
            }
        ],
        genres: [10, 4, 2, 8],
        duration: 96,
        posterImg: '/posters/MV11.png',
        trailer: 'https://www.youtube.com/watch?v=LEjhY15eCx0',
        releaseDate: '2024-06-14',
        status: 'ended',
        directors: ['Kelsey Mann'],
        casts: ['Amy Poehler', 'Maya Hawke', 'Kensington Tallman', 'Liza Lapira'],
        ratings: 4.5
    },
    {
        id: 12,
        code: 'MV12',
        translations: [
            {
                locale: 'en',
                name: 'Deadpool & Wolverine',
                brief: 'Wolverine is recovering from his injuries when he crosses paths with the loudmouth, Deadpool.',
                description: 'The Time Variance Authority (TVA) pulls Deadpool from his quiet life and sets him on a mission with a hesitant Wolverine to save the multiverse from a new threat.'
            },
            {
                locale: 'vi',
                name: 'Deadpool & Wolverine',
                brief: 'Wolverine đang hồi phục vết thương thì chạm trán với gã lắm mồm Deadpool.',
                description: 'Cơ quan Phương sai Thời gian (TVA) lôi Deadpool ra khỏi cuộc sống yên bình và giao cho anh một nhiệm vụ cùng với một Wolverine đầy miễn cưỡng để cứu đa vũ trụ khỏi một mối đe dọa mới.'
            }
        ],
        genres: [1, 4, 3],
        duration: 127,
        posterImg: '/posters/MV12.jpg',
        trailer: 'https://www.youtube.com/watch?v=73_1biulkYk',
        releaseDate: '2024-07-26',
        status: 'ended',
        directors: ['Shawn Levy'],
        casts: ['Ryan Reynolds', 'Hugh Jackman', 'Emma Corrin', 'Morena Baccarin'],
        ratings: 4.5
    },
    {
        id: 13,
        code: 'MV13',
        translations: [
            {
                locale: 'en',
                name: 'The Batman',
                brief: 'Batman ventures into Gotham City\'s underworld when a sadistic killer leaves behind a trail of cryptic clues.',
                description: 'In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.'
            },
            {
                locale: 'vi',
                name: 'The Batman',
                brief: 'Batman dấn thân vào thế giới ngầm của Thành phố Gotham khi một kẻ giết người tàn bạo để lại hàng loạt manh mối khó hiểu.',
                description: 'Trong năm thứ hai chiến đấu với tội phạm, Batman phanh phui nạn tham nhũng ở Thành phố Gotham có liên quan đến chính gia đình mình trong khi đối mặt với một kẻ giết người hàng loạt được gọi là Riddler.'
            }
        ],
        genres: [1, 12, 2, 9],
        duration: 176,
        posterImg: '/posters/MV13.jpg',
        trailer: 'https://www.youtube.com/watch?v=mqqft2x_Aa4',
        releaseDate: '2022-03-04',
        status: 'ended',
        directors: ['Matt Reeves'],
        casts: ['Robert Pattinson', 'Zoë Kravitz', 'Paul Dano', 'Jeffrey Wright'],
        ratings: 4.5
    },
    {
        id: 14,
        code: 'MV14',
        translations: [
            {
                locale: 'en',
                name: 'Tenet',
                brief: 'A secret agent embarks on a mission to prevent the start of World War III.',
                description: 'Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.'
            },
            {
                locale: 'vi',
                name: 'Tenet',
                brief: 'Một điệp viên bí mật bắt đầu một nhiệm vụ để ngăn chặn Thế chiến III.',
                description: 'Chỉ được trang bị một từ duy nhất, Tenet, và chiến đấu vì sự tồn vong của cả thế giới, nhân vật chính du hành qua một thế giới nhá nhem của tình báo quốc tế trong một nhiệm vụ sẽ diễn ra ngoài thời gian thực.'
            }
        ],
        genres: [1, 3, 5],
        duration: 150,
        posterImg: '/posters/MV14.webp',
        trailer: 'https://www.youtube.com/watch?v=L3pk_TBkihU',
        releaseDate: '2020-09-03',
        status: 'ended',
        directors: ['Christopher Nolan'],
        casts: ['John David Washington', 'Robert Pattinson', 'Elizabeth Debicki', 'Kenneth Branagh'],
        ratings: 4.5
    },
    {
        id: 15,
        code: 'MV15',
        translations: [
            {
                locale: 'en',
                name: 'Black Panther: Wakanda Forever',
                brief: 'The people of Wakanda fight to protect their home from intervening world powers.',
                description: 'The leaders of the kingdom of Wakanda fight to protect their nation from invading forces in the wake of King T\'Challa\'s death.'
            },
            {
                locale: 'vi',
                name: 'Black Panther: Wakanda Bất Diệt',
                brief: 'Người dân Wakanda chiến đấu để bảo vệ quê hương của họ khỏi các thế lực thế giới can thiệp.',
                description: 'Các nhà lãnh đạo của vương quốc Wakanda chiến đấu để bảo vệ quốc gia của họ khỏi các thế lực xâm lược sau cái chết của Vua T\'Challa.'
            }
        ],
        genres: [1, 11, 2],
        duration: 161,
        posterImg: '/posters/MV15.webp',
        trailer: 'https://www.youtube.com/watch?v=_Z3QKkl1WyM',
        releaseDate: '2022-11-11',
        status: 'coming_soon',
        directors: ['Ryan Coogler'],
        casts: ['Letitia Wright', 'Lupita Nyong\'o', 'Danai Gurira', 'Tenoch Huerta Mejía'],
        ratings: 4.5
    },
    {
        id: 16,
        code: 'MV16',
        translations: [
            {
                locale: 'en',
                name: 'Soul',
                brief: 'A musician who has lost his passion for music is transported out of his body.',
                description: 'After landing the gig of a lifetime, a New York jazz pianist suddenly finds himself trapped in a strange land between Earth and the afterlife.'
            },
            {
                locale: 'vi',
                name: 'Cuộc Sống Nhiệm Màu',
                brief: 'Một nhạc sĩ đã mất đi niềm đam mê với âm nhạc bị đưa ra khỏi cơ thể của mình.',
                description: 'Sau khi có được buổi biểu diễn để đời, một nghệ sĩ dương cầm nhạc jazz ở New York đột nhiên thấy mình bị mắc kẹt ở một vùng đất kỳ lạ giữa Trái đất và thế giới bên kia.'
            }
        ],
        genres: [10, 11, 4, 8],
        duration: 100,
        posterImg: '/posters/MV16.png',
        trailer: 'https://www.youtube.com/watch?v=xOsLIiBStEs',
        releaseDate: '2020-12-25',
        status: 'coming_soon',
        directors: ['Pete Docter', 'Kemp Powers'],
        casts: ['Jamie Foxx', 'Tina Fey', 'Graham Norton', 'Rachel House'],
        ratings: 4.5
    },
    {
        id: 17,
        code: 'MV17',
        translations: [
            {
                locale: 'en',
                name: 'Gladiator 2',
                brief: 'Lucius, the son of Lucilla, follows in the footsteps of the fallen gladiator Maximus.',
                description: 'Years after the events of the first film, Lucius, now a grown man, is set to enter the Colosseum, inspired by the legacy of Maximus.'
            },
            {
                locale: 'vi',
                name: 'Võ Sĩ Giác Đấu 2',
                brief: 'Lucius, con trai của Lucilla, nối bước võ sĩ giác đấu đã ngã xuống Maximus.',
                description: 'Nhiều năm sau các sự kiện của phần phim đầu tiên, Lucius, giờ đã là một người đàn ông trưởng thành, chuẩn bị bước vào Đấu trường La Mã, lấy cảm hứng từ di sản của Maximus.'
            }
        ],
        genres: [1, 11, 2],
        duration: 150,
        posterImg: '/posters/MV17.webp',
        trailer: 'https://www.youtube.com/watch?v=4rgYUipGJNo',
        releaseDate: '2024-11-22',
        status: 'coming_soon',
        directors: ['Ridley Scott'],
        casts: ['Paul Mescal', 'Denzel Washington', 'Connie Nielsen', 'Pedro Pascal'],
        ratings: 4.5
    },
    {
        id: 18,
        code: 'MV18',
        translations: [
            {
                locale: 'en',
                name: 'Wicked',
                brief: 'The story of how a green-skinned woman framed by the Wizard of Oz becomes the Wicked Witch of the West.',
                description: 'Based on the hit Broadway musical, Wicked tells the untold story of the witches of Oz. Elphaba, a talented magic-user who is misunderstood because of her green skin, and Galinda, a popular and privileged blonde, form an unlikely friendship at school.'
            },
            {
                locale: 'vi',
                name: 'Wicked',
                brief: 'Câu chuyện về một phụ nữ da xanh bị Phù thủy xứ Oz gài bẫy và trở thành Phù thủy độc ác của phương Tây.',
                description: 'Dựa trên vở nhạc kịch nổi tiếng ở Broadway, Wicked kể câu chuyện chưa từng được kể về các phù thủy xứ Oz. Elphaba, một người sử dụng phép thuật tài năng bị hiểu lầm vì làn da xanh của mình, và Galinda, một cô gái tóc vàng nổi tiếng và có đặc quyền, hình thành một tình bạn không ngờ ở trường.'
            }
        ],
        genres: [8, 15, 6],
        duration: 150,
        posterImg: '/posters/MV18.jpg',
        trailer: 'https://www.youtube.com/watch?v=6COmYeLsz4c',
        releaseDate: '2024-11-27',
        status: 'coming_soon',
        directors: ['Jon M. Chu'],
        casts: ['Cynthia Erivo', 'Ariana Grande', 'Jonathan Bailey', 'Michelle Yeoh'],
        ratings: 4.5
    },
    {
        id: 19,
        code: 'MV19',
        translations: [
            {
                locale: 'en',
                name: 'Superman',
                brief: 'The story of Superman\'s journey to reconcile his Kryptonian heritage with his human upbringing.',
                description: 'Superman, an alien refugee from the planet Krypton, must balance his life as journalist Clark Kent with his responsibilities as the hero of Metropolis and the world.'
            },
            {
                locale: 'vi',
                name: 'Superman',
                brief: 'Câu chuyện về hành trình của Superman để dung hòa di sản Krypton với sự nuôi dưỡng của con người.',
                description: 'Superman, một người tị nạn ngoài hành tinh từ hành tinh Krypton, phải cân bằng cuộc sống của một nhà báo Clark Kent với trách nhiệm của một anh hùng của Metropolis và thế giới.'
            }
        ],
        genres: [1, 3, 11],
        duration: 150,
        posterImg: '/posters/MV19.jpg',
        trailer: 'https://www.youtube.com/watch?v=Ox8ZLF6cGM0',
        releaseDate: '2025-07-11',
        status: 'coming_soon',
        directors: ['James Gunn'],
        casts: ['David Corenswet', 'Rachel Brosnahan', 'Nicholas Hoult', 'Isabela Merced'],
        ratings: 4.5
    },
    {
        id: 20,
        code: 'MV20',
        translations: [
            {
                locale: 'en',
                name: 'Blade',
                brief: 'A half-human, half-vampire hunter protects humanity from the undead.',
                description: 'Eric Brooks, a dhampir with all the strengths of a vampire but none of their weaknesses, dedicates his life to hunting down the creatures that killed his mother and threaten the human race.'
            },
            {
                locale: 'vi',
                name: 'Blade',
                brief: 'Một thợ săn nửa người, nửa ma cà rồng bảo vệ nhân loại khỏi xác sống.',
                description: 'Eric Brooks, một dhampir với tất cả sức mạnh của ma cà rồng nhưng không có điểm yếu nào của chúng, cống hiến cuộc đời mình để săn lùng những sinh vật đã giết mẹ anh và đe dọa loài người.'
            }
        ],
        genres: [1, 8, 7],
        duration: 130,
        posterImg: '/posters/MV20.jpg',
        trailer: 'https://www.youtube.com/watch?v=basLDO2bj2k',
        releaseDate: '2025-11-07',
        status: 'coming_soon',
        directors: ['Yann Demange'],
        casts: ['Mahershala Ali', 'Mia Goth', 'Delroy Lindo'],
        ratings: 4.5
    }
];

export const cinemas: Cinema[] = [
    // --- HÀ NỘI (22 RẠP) ---
    {
        id: 1,
        translations: [{ locale: 'vi', name: 'CGV Vincom Center Bà Triệu', description: 'Cụm rạp chiếu phim tiêu chuẩn quốc tế tại trung tâm Hà Nội.' }, { locale: 'en', name: 'CGV Vincom Center Ba Trieu', description: 'An international standard cinema complex in central Hanoi.' }],
        address: 'Tầng 6, Vincom Center, 191 Bà Triệu, Hai Bà Trưng',
        city: 'Hà Nội',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.5396398682988!2d105.84693577503089!3d21.01108308063383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab8c636ccf95%3A0xee8c463dd46033b4!2sCGV%20Vincom%20Center%20B%C3%A0%20Tri%E1%BB%87u!5e0!3m2!1svi!2s!4v1754017994664!5m2!1svi!2s'
    },
    {
        id: 2,
        translations: [{ locale: 'vi', name: 'CGV Hồ Gươm Plaza', description: 'Rạp chiếu phim hiện đại tại khu vực Hà Đông.' }, { locale: 'en', name: 'CGV Ho Guom Plaza', description: 'A modern cinema in the Ha Dong district.' }],
        address: 'Tầng 3, TTTM Hồ Gươm Plaza, 110 Trần Phú, Mộ Lao, Hà Đông',
        city: 'Hà Nội',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.33930661569!2d105.78307117503!3d20.979031680657904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acd2c0e21d7b%3A0xec2205f220faeb2!2zQ0dWIEjhu5MgR8awxqFtIFBsYXph!5e0!3m2!1svi!2s!4v1754018044960!5m2!1svi!2s'
    },
    {
        id: 3,
        translations: [{ locale: 'vi', name: 'CGV Aeon Long Biên', description: 'Cụm rạp hiện đại với công nghệ IMAX.' }, { locale: 'en', name: 'CGV Aeon Mall Long Bien', description: 'A modern cinema with IMAX technology.' }],
        address: 'Tầng 4, TTTM AEON Mall Long Biên, 27 Cổ Linh, Long Biên',
        city: 'Hà Nội',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.1311964668535!2d105.89622067503134!3d21.027435880621457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135a96a85453f37%3A0x39ce34aaf20a939!2sAeon%20Mall%20Long%20Bi%C3%AAn!5e0!3m2!1svi!2s!4v1754018116156!5m2!1svi!2s'
    },
    {
        id: 4,
        translations: [{ locale: 'vi', name: 'CGV Vincom Nguyễn Chí Thanh', description: 'Rạp chiếu phim sang trọng tại một trong những con đường sầm uất nhất Hà Nội.' }, { locale: 'en', name: 'CGV Vincom Nguyen Chi Thanh', description: 'A luxurious cinema on one of Hanoi\'s busiest streets.' }],
        address: 'Tầng 5, TTTM Vincom Center Nguyễn Chí Thanh, 54A Nguyễn Chí Thanh, Láng Thượng, Đống Đa',
        city: 'Hà Nội',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.230309993746!2d105.8094797!3d21.0234688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab6a17e518e3%3A0x82ef164fc911c781!2sVincom%20Center%20Nguy%E1%BB%85n%20Ch%C3%AD%20Thanh!5e0!3m2!1svi!2s!4v1754018144696!5m2!1svi!2s'
    },
    {
        id: 5,
        translations: [{ locale: 'vi', name: 'CGV Indochina Plaza Hà Nội', description: 'Điểm đến giải trí quen thuộc của giới trẻ khu vực Cầu Giấy.' }, { locale: 'en', name: 'CGV Indochina Plaza Hanoi', description: 'A familiar entertainment destination for young people in the Cau Giay area.' }],
        address: 'Tầng 4, Indochina Plaza, 241 Xuân Thủy, Dịch Vọng Hậu, Cầu Giấy',
        city: 'Hà Nội',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.924955855995!2d105.7827578!3d21.0356885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab4abcf6766d%3A0x3d53b16db55e9419!2sIndochina%20Plaza%20HaNoi!5e0!3m2!1svi!2s!4v1754018165189!5m2!1svi!2s'
    },
    {
        id: 6,
        translations: [{ locale: 'vi', name: 'CGV Rice City', description: 'Cụm rạp tiện lợi phục vụ cư dân khu đô thị Rice City và lân cận.' }, { locale: 'en', name: 'CGV Rice City', description: 'A convenient cinema complex serving residents of Rice City urban area and its surroundings.' }],
        address: 'Tầng 2, Tòa nhà Trung, Rice City Linh Đàm, Hoàng Liệt, Hoàng Mai',
        city: 'Hà Nội',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.726532154152!2d105.8229605!3d20.9634945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad0ab4818d47%3A0xbcf0bc5e56ff267d!2zVG_DoCBUcnVuZyBSaWNlIENpdHkgTGluaCDEkMOgbQ!5e0!3m2!1svi!2s!4v1754018181879!5m2!1svi!2s'
    },
    {
        id: 7,
        translations: [{ locale: 'vi', name: 'CGV Hà Nội Centerpoint', description: 'Rạp chiếu phim nằm ở vị trí giao thông thuận tiện trên đường Lê Văn Lương.' }, { locale: 'en', name: 'CGV Hanoi Centerpoint', description: 'A cinema conveniently located on Le Van Luong street.' }],
        address: 'Tầng 5, TTTM Hà Nội Centerpoint, 27 Lê Văn Lương, Nhân Chính, Thanh Xuân',
        city: 'Hà Nội',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.6983136271824!2d105.80427720000002!3d21.00472700000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad05e1b3a375%3A0x14291da3deed9287!2sCenter%20Point!5e0!3m2!1svi!2s!4v1754018211672!5m2!1svi!2s'
    },
    {
        id: 8,
        translations: [{ locale: 'vi', name: 'CGV Vincom Royal City', description: 'Một trong những cụm rạp lớn nhất của CGV, nằm trong khu đô thị phức hợp Royal City.' }, { locale: 'en', name: 'CGV Vincom Royal City', description: 'One of CGV\'s largest cinema complexes, located in the Royal City urban area.' }],
        address: 'Tầng B2, TTTM Vincom Mega Mall Royal City, 72A Nguyễn Trãi, Thượng Đình, Thanh Xuân',
        city: 'Hà Nội',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.7629699504155!2d105.81519560000004!3d21.002136500000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad490c3331c5%3A0x38cce1b37de2c3f6!2sVincom%20Mega%20Mall%20Royal%20City!5e0!3m2!1svi!2s!4v1754018230199!5m2!1svi!2s'
    },
    {
        id: 9,
        translations: [{ locale: 'vi', name: 'CGV Vincom Times City', description: 'Cụm rạp với nhiều phòng chiếu, bao gồm cả phòng chiếu cao cấp Gold Class.' }, { locale: 'en', name: 'CGV Vincom Times City', description: 'A cinema complex with many screens, including the premium Gold Class.' }],
        address: 'Tầng B1, TTTM Vincom Mega Mall Times City, 458 Minh Khai, Hai Bà Trưng',
        city: 'Hà Nội',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.9458657873042!2d105.8678324!3d20.994806999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac04b6fcfa63%3A0x579e974a43b9f42f!2sVincom%20Mega%20Mall%20Times%20City!5e0!3m2!1svi!2s!4v1754018253143!5m2!1svi!2s'
    },
    {
        id: 10,
        translations: [{ locale: 'vi', name: 'CGV Vincom Long Biên', description: 'Rạp chiếu phim tại khu đô thị Vinhomes Riverside.' }, { locale: 'en', name: 'CGV Vincom Long Bien', description: 'A cinema in the Vinhomes Riverside urban area.' }],
        address: 'Tầng 4, TTTM Vincom Plaza Long Biên, Phúc Lợi, Long Biên',
        city: 'Hà Nội',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.552207783889!2d105.9164512!3d21.050596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135a9de9d0cc337%3A0xe15f797dbd2797e2!2sVincom%20Plaza%20Long%20Bi%C3%AAn!5e0!3m2!1svi!2s!4v1754018268551!5m2!1svi!2s'
    },
    {
        id: 11,
        translations: [{ locale: 'vi', name: 'CGV Mac Plaza (Machinco)', description: 'Rạp chiếu phim tại tòa nhà Machinco, phục vụ khu vực Hà Đông.' }, { locale: 'en', name: 'CGV Mac Plaza (Machinco)', description: 'A cinema in the Machinco building, serving the Ha Dong area.' }],
        address: 'Tầng 7, Tòa nhà Machinco, 10 Trần Phú, Mộ Lao, Hà Đông',
        city: 'Hà Nội',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.227801896233!2d105.7913493!3d20.983503699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad06aaeee37f%3A0x380d3de0f471c92e!2sCGV%20Machinco!5e0!3m2!1svi!2s!4v1754018283255!5m2!1svi!2s'
    },
    {
        id: 12,
        translations: [{ locale: 'vi', name: 'CGV Trương Định Plaza', description: 'Cụm rạp tại quận Hoàng Mai.' }, { locale: 'en', name: 'CGV Truong Dinh Plaza', description: 'A cinema complex in Hoang Mai district.' }],
        address: 'Tầng 5, Trương Định Plaza, 461 Trương Định, Tân Mai, Hoàng Mai',
        city: 'Hà Nội',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.2075706208125!2d105.8462634!3d20.984315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad6dfd2d2985%3A0x8198c2d2ff778f26!2zVHLGsMahbmcgxJDhu4tuaCBQbGF6YQ!5e0!3m2!1svi!2s!4v1754018302440!5m2!1svi!2s'
    },
    {
        id: 13,
        translations: [{ locale: 'vi', name: 'CGV Tràng Tiền Plaza', description: 'Rạp chiếu phim sang trọng nằm ngay trung tâm thủ đô.' }, { locale: 'en', name: 'CGV Trang Tien Plaza', description: 'A luxurious cinema located right in the heart of the capital.' }],
        address: 'Tầng 5, TTTM Tràng Tiền Plaza, 24 Hai Bà Trưng, Hoàn Kiếm',
        city: 'Hà Nội',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.196633569566!2d105.8532846!3d21.0248168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab85b21db31f%3A0x497acf351c7dd9fc!2zVHLDoG5nIFRp4buBbiBQbGF6YQ!5e0!3m2!1svi!2s!4v1754018315846!5m2!1svi!2s'
    },
    {
        id: 14,
        translations: [{ locale: 'vi', name: 'CGV Sun Grand Thụy Khuê', description: 'Cụm rạp với tầm nhìn đẹp, gần Hồ Tây.' }, { locale: 'en', name: 'CGV Sun Grand Thuy Khue', description: 'A cinema with a beautiful view, near West Lake.' }],
        address: 'Tầng 5, TTTM Sun Grand City, 69B Thụy Khuê, Tây Hồ',
        city: 'Hà Nội',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.7997186231482!2d105.8258984!3d21.0406983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abbc998979a1%3A0xdfc0be5ac8ed0c79!2zU3VuIFBsYXphIFRo4buleSBLaHXDqg!5e0!3m2!1svi!2s!4v1754018328640!5m2!1svi!2s'
    },
    {
        id: 15,
        translations: [{ locale: 'vi', name: 'CGV Sun Grand Lương Yên', description: 'Rạp chiếu phim tại khu vực trung tâm, gần phố cổ.' }, { locale: 'en', name: 'CGV Sun Grand Luong Yen', description: 'A cinema in the central area, near the Old Quarter.' }],
        address: 'Tầng 3, Sun Grand City Ancora, 3 Lương Yên, Bạch Đằng, Hai Bà Trưng',
        city: 'Hà Nội',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.561710383102!2d105.8638455!3d21.010199099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab0067d49c1b%3A0x39ba94cade72ed64!2sSảnh%20T1%20-%20Sun%20Grand%20City%20Ancora!5e0!3m2!1svi!2s!4v1754018342022!5m2!1svi!2s'
    },
    {
        id: 16,
        translations: [{ locale: 'vi', name: 'CGV Vincom Bắc Từ Liêm', description: 'Phục vụ khán giả khu vực Bắc Từ Liêm và các vùng lân cận.' }, { locale: 'en', name: 'CGV Vincom Bac Tu Liem', description: 'Serving audiences in the Bac Tu Liem area and its surroundings.' }],
        address: 'Tầng 5, TTTM Vincom Plaza Bắc Từ Liêm, 234 Phạm Văn Đồng, Cổ Nhuế, Bắc Từ Liêm',
        city: 'Hà Nội',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.499739030898!2d105.78070819999999!3d21.052693599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345593b3245b6d%3A0xae56b6a7812d36d1!2zVmluY29tIFBsYXphIELhuq9jIFThu6sgTGnDqm0!5e0!3m2!1svi!2s!4v1754018355014!5m2!1svi!2s'
    },
    {
        id: 17,
        translations: [{ locale: 'vi', name: 'CGV Vincom Metropolis Liễu Giai', description: 'Rạp chiếu phim đẳng cấp tại tòa nhà Metropolis.' }, { locale: 'en', name: 'CGV Vincom Metropolis Lieu Giai', description: 'A high-class cinema in the Metropolis building.' }],
        address: 'Tầng 3, TTTM Vincom Center Metropolis, 29 Liễu Giai, Ngọc Khánh, Ba Đình',
        city: 'Hà Nội',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0395113101144!2d105.8149069!3d21.031105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab4d99f52189%3A0x796855c662901401!2sStarbucks%20Vincom%20Metropolis!5e0!3m2!1svi!2s!4v1754018382565!5m2!1svi!2s'
    },
    {
        id: 18,
        translations: [{ locale: 'vi', name: 'CGV Xuân Diệu', description: 'Rạp chiếu phim dành cho cộng đồng khu vực Tây Hồ.' }, { locale: 'en', name: 'CGV Xuan Dieu', description: 'A cinema for the Tay Ho community.' }],
        address: 'Tầng 2, Tòa nhà D\' Le Roi Soleil, 59 Xuân Diệu, Quảng An, Tây Hồ',
        city: 'Hà Nội',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.1896848597935!2d105.8271698!3d21.0650849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aaf85e998405%3A0xea258ab0ab0346d!2sD%27.%20LE%20ROI%20SOLEIL%20PREMIUM%20SUITES!5e0!3m2!1svi!2s!4v1754018398274!5m2!1svi!2s'
    },
    {
        id: 19,
        translations: [{ locale: 'vi', name: 'CGV Vincom Sky Lake Phạm Hùng', description: 'Cụm rạp hiện đại tại khu vực Mỹ Đình.' }, { locale: 'en', name: 'CGV Vincom Sky Lake Pham Hung', description: 'A modern cinema complex in the My Dinh area.' }],
        address: 'Tầng 3, TTTM Vincom Plaza Skylake, Phạm Hùng, Mỹ Đình 1, Nam Từ Liêm',
        city: 'Hà Nội',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.3155985562084!2d105.7812136!3d21.0200545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455e34a87eb29%3A0xd88a1bacb077ac22!2sCGV%20Skylake!5e0!3m2!1svi!2s!4v1754018447036!5m2!1svi!2s'
    },
    {
        id: 20,
        translations: [{ locale: 'vi', name: 'CGV Vincom Trần Duy Hưng', description: 'Rạp chiếu phim tại ngã tư Trần Duy Hưng - Khuất Duy Tiến.' }, { locale: 'en', name: 'CGV Vincom Tran Duy Hung', description: 'A cinema at the intersection of Tran Duy Hung - Khuat Duy Tien.' }],
        address: 'Tầng 5, TTTM Vincom Center Trần Duy Hưng, 119 Trần Duy Hưng, Trung Hòa, Cầu Giấy',
        city: 'Hà Nội',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.6444862044514!2d105.7958149!3d21.0068834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135adb1e9b63c6b%3A0xc7ad968c046d18fa!2sVincom%20Center%20Tr%E1%BA%A7n%20Duy%20H%C6%B0ng!5e0!3m2!1svi!2s!4v1754018548784!5m2!1svi!2s'
    },
    {
        id: 21,
        translations: [{ locale: 'vi', name: 'CGV Aeon Hà Đông', description: 'Cụm rạp lớn nhất khu vực Hà Đông với nhiều công nghệ mới.' }, { locale: 'en', name: 'CGV Aeon Ha Dong', description: 'The largest cinema complex in Ha Dong with many new technologies.' }],
        address: 'Tầng 3, TTTM AEON Mall Hà Đông, Dương Nội, Hà Đông',
        city: 'Hà Nội',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.0731744013488!2d105.75171689999999!3d20.9897037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab7bee9f7757%3A0x4ebf8ccfc24ec4ae!2zQWVvbiBNYWxsIEjDoCDEkMO0bmc!5e0!3m2!1svi!2s!4v1754018623247!5m2!1svi!2s'
    },
    {
        id: 22,
        translations: [{ locale: 'vi', name: 'CGV Vincom Ocean Park', description: 'Cụm rạp tại thành phố biển hồ Ocean Park.' }, { locale: 'en', name: 'CGV Vincom Ocean Park', description: 'A cinema complex in the Ocean Park lake city.' }],
        address: 'Tầng 3, TTTM Vincom Mega Mall Ocean Park, Gia Lâm',
        city: 'Hà Nội',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.96870632906!2d105.95938419999999!3d20.9938915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad60e1b65fa7%3A0xca825ac326d4ba54!2sVincom%20Mega%20Mall%20Ocean%20Park!5e0!3m2!1svi!2s!4v1754018638533!5m2!1svi!2s'
    },
    // --- TP. HỒ CHÍ MINH (21 RẠP) ---
    {
        id: 23,
        translations: [{ locale: 'vi', name: 'CGV Hùng Vương Plaza', description: 'Một trong những cụm rạp đầu tiên của CGV tại TP.HCM.' }, { locale: 'en', name: 'CGV Hung Vuong Plaza', description: 'One of the first CGV cinemas in HCMC.' }],
        address: 'Tầng 7, Hùng Vương Plaza, 126 Hồng Bàng, Phường 12, Quận 5',
        city: 'TP. Hồ Chí Minh',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.717380055253!2d106.66306209999999!3d10.756251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ef0f45da121%3A0x6ce5d38673084259!2zSMO5bmcgVsawxqFuZyBQbGF6YQ!5e0!3m2!1svi!2s!4v1754018651438!5m2!1svi!2s'
    },
    {
        id: 24,
        translations: [{ locale: 'vi', name: 'CGV Crescent Mall', description: 'Trải nghiệm điện ảnh cao cấp tại Quận 7.' }, { locale: 'en', name: 'CGV Crescent Mall', description: 'A premium cinema experience in District 7.' }],
        address: 'Tầng 5, Crescent Mall, 101 Tôn Dật Tiên, Tân Phú, Quận 7',
        city: 'TP. Hồ Chí Minh',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.0771201925613!2d106.71874679999999!3d10.728535199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f894320f91b%3A0xb6c098e537ce0abe!2sCrescent%20Mall!5e0!3m2!1svi!2s!4v1754018663573!5m2!1svi!2s'
    },
    {
        id: 25,
        translations: [{ locale: 'vi', name: 'CGV Thảo Điền Pearl', description: 'Rạp chiếu phim hiện đại tại khu vực Thảo Điền.' }, { locale: 'en', name: 'CGV Thao Dien Pearl', description: 'A modern cinema in the Thao Dien area.' }],
        address: 'Tầng 2, Thảo Điền Pearl, 12 Quốc Hương, Thảo Điền, TP. Thủ Đức',
        city: 'TP. Hồ Chí Minh',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1309606658033!2d106.7328725!3d10.8012804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175261a51b3d5eb%3A0xca45e9df7b7cff4c!2zUGVhcmwgQ2VudGVyIC0gVGjhuqNvIMSQaeG7gW4gUGVhcmw!5e0!3m2!1svi!2s!4v1754018679070!5m2!1svi!2s'
    },
    {
        id: 26,
        translations: [{ locale: 'vi', name: 'CGV Vincom Thủ Đức', description: 'Điểm đến giải trí hàng đầu tại TP. Thủ Đức.' }, { locale: 'en', name: 'CGV Vincom Thu Duc', description: 'A leading entertainment destination in Thu Duc City.' }],
        address: 'Tầng 5, TTTM Vincom Plaza Thủ Đức, 216 Võ Văn Ngân, Bình Thọ, TP. Thủ Đức',
        city: 'TP. Hồ Chí Minh',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4924465053687!2d106.76509999999999!3d10.850100000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527a1fc80477b%3A0x62944f7a73c84aaf!2zVmluY29tIFBsYXphIFRo4bunIMSQ4bupYw!5e0!3m2!1svi!2s!4v1754018693341!5m2!1svi!2s'
    },
    {
        id: 27,
        translations: [{ locale: 'vi', name: 'CGV Vivo City', description: 'Cụm rạp lớn với nhiều phòng chiếu, bao gồm cả IMAX.' }, { locale: 'en', name: 'CGV Vivo City', description: 'A large cinema complex with many screens, including IMAX.' }],
        address: 'Tầng 5, SC VivoCity, 1058 Nguyễn Văn Linh, Tân Phong, Quận 7',
        city: 'TP. Hồ Chí Minh',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.0551214610787!2d106.7033975!3d10.7302321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f80c3947d97%3A0x11f8c4c9b629e2cf!2sSC%20VivoCity!5e0!3m2!1svi!2s!4v1754018708950!5m2!1svi!2s'
    },
    {
        id: 28,
        translations: [{ locale: 'vi', name: 'CGV Pearl Plaza', description: 'Rạp chiếu phim tại quận Bình Thạnh.' }, { locale: 'en', name: 'CGV Pearl Plaza', description: 'A cinema in Binh Thanh district.' }],
        address: 'Tầng 5, Pearl Plaza, 561A Điện Biên Phủ, Phường 25, Quận Bình Thạnh',
        city: 'TP. Hồ Chí Minh',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1481959506145!2d106.71856299999999!3d10.7999596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529d7845738f3%3A0x6fd8270abc8b4947!2sPearl%20Plaza!5e0!3m2!1svi!2s!4v1754018723260!5m2!1svi!2s'
    },
    {
        id: 29,
        translations: [{ locale: 'vi', name: 'CGV Liberty Citypoint', description: 'Rạp chiếu phim nằm ngay trung tâm Quận 1.' }, { locale: 'en', name: 'CGV Liberty Citypoint', description: 'A cinema located right in the center of District 1.' }],
        address: 'Tầng M, Khách sạn Liberty Center Saigon Citypoint, 59-61 Pasteur, Quận 1',
        city: 'TP. Hồ Chí Minh',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4774277727442!2d106.70063479999999!3d10.774698700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f476e598cb1%3A0x76720b1358eb9260!2zS2jDoWNoIHPhuqFuIExpYmVydHkgQ2VudHJhbCBTw6BpIEfDsm4gQ2l0eVBvaW50!5e0!3m2!1svi!2s!4v1754018737308!5m2!1svi!2s'
    },
    {
        id: 30,
        translations: [{ locale: 'vi', name: 'CGV Vincom Đồng Khởi', description: 'Rạp chiếu phim sang trọng tại một trong những TTTM sầm uất nhất Sài Gòn.' }, { locale: 'en', name: 'CGV Vincom Dong Khoi', description: 'A luxurious cinema in one of Saigon\'s busiest shopping malls.' }],
        address: 'Tầng 3, TTTM Vincom Center, 72 Lê Thánh Tôn, Bến Nghé, Quận 1',
        city: 'TP. Hồ Chí Minh',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4341018727314!2d106.70204179999998!3d10.778026300000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4876c29a9b%3A0xd2c79768678d2142!2zVmluY29tIENlbnRlciDEkOG7k25nIEto4bufaQ!5e0!3m2!1svi!2s!4v1754018751388!5m2!1svi!2s'
    },
    {
        id: 31,
        translations: [{ locale: 'vi', name: 'CGV Menas Mall (CGV CT Plaza)', description: 'Rạp chiếu phim gần sân bay Tân Sơn Nhất.' }, { locale: 'en', name: 'CGV Menas Mall (CGV CT Plaza)', description: 'A cinema near Tan Son Nhat airport.' }],
        address: 'Tầng 10, Menas Mall, 60A Trường Sơn, Phường 2, Quận Tân Bình',
        city: 'TP. Hồ Chí Minh',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.9772125561035!2d106.66555559999998!3d10.813055599999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529180a52601b%3A0xaf95c7444b843c70!2sCGV%20Menas%20Mall%20Saigon%20Airport!5e0!3m2!1svi!2s!4v1754018792388!5m2!1svi!2s'
    },
    {
        id: 32,
        translations: [{ locale: 'vi', name: 'CGV Pandora City', description: 'Cụm rạp tại quận Tân Phú.' }, { locale: 'en', name: 'CGV Pandora City', description: 'A cinema complex in Tan Phu district.' }],
        address: 'Tầng 4, Pandora City, 1/1 Trường Chinh, Tây Thạnh, Quận Tân Phú',
        city: 'TP. Hồ Chí Minh',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.0642861316364!2d106.63423549999999!3d10.806388399999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175295978943725%3A0x4012c0c89a5b6635!2sCGV%20Pandora%20City!5e0!3m2!1svi!2s!4v1754018815357!5m2!1svi!2s'
    },
    {
        id: 33,
        translations: [{ locale: 'vi', name: 'CGV Aeon Tân Phú', description: 'Cụm rạp lớn tại TTTM Aeon Mall Tân Phú Celadon.' }, { locale: 'en', name: 'CGV Aeon Tan Phu', description: 'A large cinema complex at Aeon Mall Tan Phu Celadon.' }],
        address: 'Tầng 3, TTTM Aeon Mall, 30 Bờ Bao Tân Thắng, Sơn Kỳ, Quận Tân Phú',
        city: 'TP. Hồ Chí Minh',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.125458716046!2d106.6179746!3d10.801701999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752bfa7d191e05%3A0xc75071084fbeba9e!2zQ0dWIENlbGFkb24gVMOibiBQaMO6!5e0!3m2!1svi!2s!4v1754018826871!5m2!1svi!2s'
    },
    {
        id: 34,
        translations: [{ locale: 'vi', name: 'CGV Vincom Gò Vấp', description: 'Rạp chiếu phim tại quận Gò Vấp.' }, { locale: 'en', name: 'CGV Vincom Go Vap', description: 'A cinema in Go Vap district.' }],
        address: 'Tầng 5, TTTM Vincom Plaza, 12 Phan Văn Trị, Phường 7, Quận Gò Vấp',
        city: 'TP. Hồ Chí Minh',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.7934386723705!2d106.6892817!3d10.827113799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528f9600a6f3d%3A0x6b75d60918c5fc05!2zQ0dWIFZpbmNvbSBQaGFuIFbEg24gVHLhu4s!5e0!3m2!1svi!2s!4v1754018842093!5m2!1svi!2s'
    },
    {
        id: 35,
        translations: [{ locale: 'vi', name: 'CGV Hoàng Văn Thụ', description: 'Rạp chiếu phim với phòng chiếu L\'amour sang trọng.' }, { locale: 'en', name: 'CGV Hoang Van Thu', description: 'A cinema with the luxurious L\'amour screening room.' }],
        address: 'Tầng 1 và 2, Gala Center, 415 Hoàng Văn Thụ, Phường 2, Quận Tân Bình',
        city: 'TP. Hồ Chí Minh',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.164702446363!2d106.6601481!3d10.7986945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175293117e2c76f%3A0xb556bcbe361c8cc!2zQ0dWIEhvw6BuZyBWxINuIFRo4bul!5e0!3m2!1svi!2s!4v1754018856005!5m2!1svi!2s'
    },
    {
        id: 36,
        translations: [{ locale: 'vi', name: 'CGV Aeon Bình Tân', description: 'Cụm rạp lớn tại cửa ngõ phía Tây thành phố.' }, { locale: 'en', name: 'CGV Aeon Binh Tan', description: 'A large cinema complex at the western gateway of the city.' }],
        address: 'Tầng 3, TTTM Aeon Mall, 1 Đường Số 17A, Bình Trị Đông B, Quận Bình Tân',
        city: 'TP. Hồ Chí Minh',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.8859500527515!2d106.6129012!3d10.7432725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752dcec1b9cb21%3A0xc76983f1bcfd1227!2sCGV%20AEON%20Mall%20B%C3%ACnh%20T%C3%A2n!5e0!3m2!1svi!2s!4v1754018868885!5m2!1svi!2s'
    },
    {
        id: 37,
        translations: [{ locale: 'vi', name: 'CGV Saigonres Nguyễn Xí', description: 'Rạp chiếu phim tại quận Bình Thạnh.' }, { locale: 'en', name: 'CGV Saigonres Nguyen Xi', description: 'A cinema in Binh Thanh district.' }],
        address: 'Tầng 4 và 5, TTTM Saigonres Plaza, 188 Nguyễn Xí, Phường 26, Quận Bình Thạnh',
        city: 'TP. Hồ Chí Minh',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.9331174680165!2d106.7072269!3d10.816430400000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528914a364431%3A0xacb2294b70a757a4!2zQ0dWIFNhaWdvbnJlcyBOZ3V54buFbiBYw60!5e0!3m2!1svi!2s!4v1754018881515!5m2!1svi!2s'
    },
    {
        id: 38,
        translations: [{ locale: 'vi', name: 'CGV Sư Vạn Hạnh', description: 'Cụm rạp tại TTTM Vạn Hạnh Mall.' }, { locale: 'en', name: 'CGV Su Van Hanh', description: 'A cinema complex at Van Hanh Mall.' }],
        address: 'Tầng 6, Vạn Hạnh Mall, 11 Sư Vạn Hạnh, Phường 12, Quận 10',
        city: 'TP. Hồ Chí Minh',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.531407795258!2d106.6695417!3d10.7705514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752edde029b133%3A0x97e90e1306ccf98e!2zQ0dWIFPGsCBW4bqhbiBI4bqhbmg!5e0!3m2!1svi!2s!4v1754018892971!5m2!1svi!2s'
    },
    {
        id: 39,
        translations: [{ locale: 'vi', name: 'CGV Vincom Center Landmark 81', description: 'Rạp chiếu phim trong tòa nhà cao nhất Việt Nam.' }, { locale: 'en', name: 'CGV Vincom Center Landmark 81', description: 'A cinema in the tallest building in Vietnam.' }],
        address: 'Tầng B1, TTTM Vincom Center, 772 Điện Biên Phủ, Phường 22, Quận Bình Thạnh',
        city: 'TP. Hồ Chí Minh',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2184387187303!2d106.72209889999999!3d10.794575000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529efc333959f%3A0x370ad7e2d5e414cb!2sCGV%20Vincom%20Center%20Landmark%2081!5e0!3m2!1svi!2s!4v1754018903656!5m2!1svi!2s'
    },
    {
        id: 40,
        translations: [{ locale: 'vi', name: 'CGV Satra Củ Chi', description: 'Rạp chiếu phim phục vụ khán giả tại Củ Chi.' }, { locale: 'en', name: 'CGV Satra Cu Chi', description: 'A cinema serving audiences in Cu Chi.' }],
        address: 'Tầng 3, TTTM Satra Củ Chi, 1239 Tỉnh Lộ 8, Ấp Thạnh An, Xã Trung An, Huyện Củ Chi',
        city: 'TP. Hồ Chí Minh',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.728696858364!2d106.5797348!3d10.983839000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d37a1a920713%3A0xba20e68d0b6a9d1d!2sCGV%20Satra%20C%E1%BB%A7%20Chi!5e0!3m2!1svi!2s!4v1754018916102!5m2!1svi!2s'
    },
    {
        id: 41,
        translations: [{ locale: 'vi', name: 'CGV Gigamall Thủ Đức', description: 'Cụm rạp hiện đại tại TTTM Gigamall.' }, { locale: 'en', name: 'CGV Gigamall Thu Duc', description: 'A modern cinema complex at Gigamall.' }],
        address: 'Tầng 6, TTTM Gigamall, 240-242 Phạm Văn Đồng, Hiệp Bình Chánh, TP. Thủ Đức',
        city: 'TP. Hồ Chí Minh',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.787074744622!2d106.7212132!3d10.8276003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752930d4f0ef63%3A0xfeffcc189deddb5b!2zQ0dWIEdpZ2EgTWFsbCBUaOG7pyDEkOG7qWM!5e0!3m2!1svi!2s!4v1754018929547!5m2!1svi!2s'
    },
    {
        id: 42,
        translations: [{ locale: 'vi', name: 'CGV Lý Chính Thắng', description: 'Rạp chiếu phim tại Quận 3.' }, { locale: 'en', name: 'CGV Ly Chinh Thang', description: 'A cinema in District 3.' }],
        address: 'Tầng 3, 83 Lý Chính Thắng, Võ Thị Sáu, Quận 3',
        city: 'TP. Hồ Chí Minh',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2898109357116!2d106.68565029999999!3d10.7891011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fe72df5395b%3A0xca89891a2c85b8f2!2zQ0dWIEzDvSBDaMOtbmggVGjhuq9uZw!5e0!3m2!1svi!2s!4v1754018941404!5m2!1svi!2s'
    },
    {
        id: 43,
        translations: [{ locale: 'vi', name: 'CGV Vincom Mega Mall Grand Park', description: 'Cụm rạp tại đại đô thị Vinhomes Grand Park.' }, { locale: 'en', name: 'CGV Vincom Mega Mall Grand Park', description: 'A cinema complex in the Vinhomes Grand Park megacity.' }],
        address: 'Tầng 3, TTTM Vincom Mega Mall, KĐT Vinhomes Grand Park, TP. Thủ Đức',
        city: 'TP. Hồ Chí Minh',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.5848937815285!2d106.842584!3d10.8430451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317521d4f119d7bb%3A0xd348d4f6ad2af08f!2sCGV%20Vincom%20Mega%20Mall%20Grand%20Park!5e0!3m2!1svi!2s!4v1754018956221!5m2!1svi!2s'
    },
    // --- HẢI PHÒNG (2 RẠP) ---
    {
        id: 44,
        translations: [{ locale: 'vi', name: 'CGV Vincom Hải Phòng', description: 'Rạp chiếu phim tại TTTM Vincom Imperia.' }, { locale: 'en', name: 'CGV Vincom Hai Phong', description: 'A cinema at Vincom Imperia Shopping Mall.' }],
        address: 'Tầng 4, TTTM Vincom Plaza Imperia, Khu đô thị Vinhomes Imperia, Thượng Lý, Hồng Bàng',
        city: 'Hải Phòng',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.2198913057873!2d106.66253809999999!3d20.8631854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7bf642c8adb3%3A0xa852f981ea9d956!2sCGV%20Vincom%20Imperia%20H%E1%BA%A3i%20Ph%C3%B2ng!5e0!3m2!1svi!2s!4v1754018969890!5m2!1svi!2s'
    },
    {
        id: 45,
        translations: [{ locale: 'vi', name: 'CGV Aeon Mall Hải Phòng', description: 'Cụm rạp lớn tại TTTM Aeon Mall Lê Chân.' }, { locale: 'en', name: 'CGV Aeon Mall Hai Phong', description: 'A large cinema complex at Aeon Mall Le Chan.' }],
        address: 'Tầng 3, TTTM Aeon Mall, 10 Võ Nguyên Giáp, Kênh Dương, Lê Chân',
        city: 'Hải Phòng',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.9735210152735!2d106.68087419999999!3d20.8327757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7120acd8724d%3A0x71797f6955970ddc!2zQ0dWIEFlb24gTWFsbCBI4bqjaSBQaMOybmc!5e0!3m2!1svi!2s!4v1754018983412!5m2!1svi!2s'
    }
];

const generateAllScreens = (allCinemas: Cinema[]): Screen[] => {
    const allScreens: Screen[] = [];
    let screenId = 1;
    const screenTypes: Screen['type'][] = ['standard', 'VIP', 'IMAX', '3D', '4D'];

    for (const cinema of allCinemas) {
        // Tạo 3 phòng chiếu cho mỗi rạp
        for (let i = 1; i <= 3; i++) {
            const randomIndex = Math.floor(Math.random() * screenTypes.length);
            const randomType = screenTypes[randomIndex] as Screen['type'];
            allScreens.push({
                id: screenId,
                name: `Screen ${i}`,
                cinemaId: cinema.id,
                capacity: 50,
                type: randomType
            });
            screenId++;
        }
    }
    return allScreens;
};

const getCoupleSeatLabel = (col: number) => {
    return `${col}-${col + 1}`;
}

const generateSeatsForScreen = (screenId: number, startSeatId: number): { seats: Seat[], nextSeatId: number } => {
    const seats: Seat[] = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const columns = 10;
    let currentSeatId = startSeatId;

    const seatTypesConfig = {
        standard: { price: 80000, rows: ['A', 'B', 'C'] },
        vip: { price: 120000, rows: ['D', 'E', 'F'] },
        couple: { price: 220000, rows: ['G'] }
    };

    for (const row of rows) {
        for (let col = 1; col <= columns; col++) {
            let type: SeatType = 'standard';
            let price = seatTypesConfig.standard.price;

            if (seatTypesConfig.vip.rows.includes(row)) {
                type = 'vip';
                price = seatTypesConfig.vip.price;
            } else if (seatTypesConfig.couple.rows.includes(row)) {
                // For couple seats, only use odd-numbered columns
                // This ensures each couple seat occupies two adjacent seats (e.g., seats 1 & 2, 3 & 4, ...).
                // Skip even-numbered columns to avoid generating duplicate couple seats for the second seat in each pair
                if (col % 2 === 0) {
                    continue;
                }
                type = 'couple';
                price = seatTypesConfig.couple.price;
            }

            seats.push({
                id: currentSeatId,
                screenId: screenId,
                row: row,
                column: type === 'couple' ? getCoupleSeatLabel(col) : col.toString(),
                isAvailable: true,
                type: type,
                price: price
            });
            currentSeatId++;

            if (type === 'couple') {
                col++;
            }
        }
    }
    return { seats, nextSeatId: currentSeatId };
};

const generateAllSeats = (allScreens: Screen[]): Seat[] => {
    let allSeats: Seat[] = [];
    let nextSeatId = 1;

    for (const screen of allScreens) {
        const result = generateSeatsForScreen(screen.id, nextSeatId);
        allSeats = allSeats.concat(result.seats);
        nextSeatId = result.nextSeatId;
    }
    return allSeats;
};

const createTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const dates = ['2025-08-11', '2025-08-12', '2025-08-13', '2025-08-14', '2025-08-15', '2025-08-16', '2025-08-17'];
    const startTimes = ['09:00', '11:30', '14:00', '16:30', '19:00', '21:30'];
    let id = 1;
    for (const date of dates) {
        for (const startTime of startTimes) {
            const [hour, minute] = startTime.split(':').map(Number);
            const end = new Date(`${date}T${startTime}`);
            end.setMinutes(end.getMinutes() + 150); // Thêm 150 phút
            const endTime = `${end.getHours().toString().padStart(2, '0')}:${end.getMinutes().toString().padStart(2, '0')}`;
            slots.push({ id, startTime, endTime, date });
            id++;
        }
    }
    return slots;
};

const createMovieSchedules = (allCinemas: Cinema[], allScreens: Screen[], allTimeSlots: TimeSlot[]): MovieSchedule[] => {
    const schedules: MovieSchedule[] = [];
    let scheduleId = 1;
    const usedScreenTime = new Set<string>(); // Key: "screenId-timeSlotId"
    const todayStr = '2025-07-30'; // Giả định ngày hôm nay

    const pastTimeSlots = allTimeSlots.filter(ts => ts.date < todayStr);
    const nowShowingTimeSlots = allTimeSlots.filter(ts => ts.date >= todayStr);
    const endedMovies = movies.filter(m => m.status === 'ended');
    const nowShowingMovies = movies.filter(m => m.status === 'now_showing');

    // Tạo lịch cho phim đang chiếu
    for (const movie of nowShowingMovies) {
        // Tạo lịch chiếu ở 5 rạp ngẫu nhiên để dữ liệu không quá lớn
        const randomCinemas = [...allCinemas].sort(() => 0.5 - Math.random()).slice(0, 5);
        for (const cinema of randomCinemas) {
            const cinemaScreens = allScreens.filter(s => s.cinemaId === cinema.id);
            if (cinemaScreens.length === 0) continue;

            const screen = cinemaScreens[Math.floor(Math.random() * cinemaScreens.length)];
            const timeSlot = nowShowingTimeSlots[Math.floor(Math.random() * nowShowingTimeSlots.length)];
            if (!screen || !timeSlot) continue;

            const key = `${screen.id}-${timeSlot.id}`;
            if (!usedScreenTime.has(key)) {
                schedules.push({ id: scheduleId++, cinemaId: cinema.id, movieId: movie.id, screenId: screen.id, timeSlotId: timeSlot.id });
                usedScreenTime.add(key);
            }
        }
    }
    return schedules;
};

export const screens: Screen[] = generateAllScreens(cinemas);

export const seats: Seat[] = generateAllSeats(screens);

export const timeSlots: TimeSlot[] = createTimeSlots();

export const movieSchedules: MovieSchedule[] = createMovieSchedules(cinemas, screens, timeSlots);

export const events: Event[] = [
    {
        id: 1,
        code: 'HAPPY-TUESDAY',
        translations: [
            {
                locale: 'vi',
                name: 'Thứ Ba Vui Vẻ - Đồng Giá Vé 2D',
                description: 'Tận hưởng ngày thứ Ba hàng tuần với giá vé 2D cực kỳ ưu đãi tại tất cả các rạp CGV.',
                terms: 'Áp dụng cho tất cả các suất chiếu 2D vào ngày thứ Ba, không bao gồm ngày lễ, Tết. Không áp dụng cho phòng chiếu đặc biệt như IMAX, 4DX, VIP.'
            },
            {
                locale: 'en',
                name: 'Happy Tuesday - Flat Rate for 2D Tickets',
                description: 'Enjoy every Tuesday with a special flat rate for 2D movie tickets at all CGV cinemas.',
                terms: 'Applies to all 2D screenings on Tuesdays, excluding public holidays. Not applicable for special formats like IMAX, 4DX, VIP.'
            }
        ],
        type: 'discount',
        startDate: '2025-01-01',
        endDate: '2025-12-31',
        status: 'active',
        image: '/events/event1.webp',
        applicableCinemas: [], // Áp dụng cho tất cả rạp
    },
    {
        id: 2,
        code: 'MARVEL-FAN-MEETUP-2025',
        translations: [
            {
                locale: 'vi',
                name: 'Sự Kiện Đặc Biệt: Ra Mắt "Bộ Tứ Siêu Đẳng"',
                description: 'Tham gia suất chiếu đặc biệt và nhận quà tặng độc quyền từ Marvel dành cho fan hâm mộ.',
                terms: 'Chỉ áp dụng cho suất chiếu lúc 19:00 ngày 25/07/2025 tại CGV Vincom Center Bà Triệu. Số lượng có hạn.'
            },
            {
                locale: 'en',
                name: 'Special Event: "The Fantastic Four" Premiere',
                description: 'Join the special screening and receive exclusive Marvel merchandise for fans.',
                terms: 'Only applicable for the 19:00 screening on July 25, 2025, at CGV Vincom Center Ba Trieu. Limited availability.'
            }
        ],
        type: 'special_screening',
        startDate: '2025-07-25',
        endDate: '2025-07-25',
        status: 'active',
        image: '/events/event2.jpeg',
        applicableCinemas: [1], // Chỉ áp dụng cho CGV Vincom Center Bà Triệu
        applicableMovies: [3], // Chỉ áp dụng cho phim "The Fantastic Four"
    },
    {
        id: 3,
        code: 'VIP-COMBO-DEAL',
        translations: [
            {
                locale: 'vi',
                name: 'Ưu Đãi Combo Cho Thành Viên VIP',
                description: 'Thành viên VIP và VVIP được giảm giá 30% khi mua bất kỳ combo bắp nước nào.',
                terms: 'Thành viên cần xuất trình thẻ/mã thành viên VIP hoặc VVIP tại quầy. Áp dụng cho tất cả các ngày trong tuần.'
            },
            {
                locale: 'en',
                name: 'VIP Combo Deal',
                description: 'VIP and VVIP members get a 30% discount on any popcorn and drink combo.',
                terms: 'Members must present their VIP or VVIP membership card/code at the counter. Applicable on all days of the week.'
            }
        ],
        type: 'combo',
        startDate: '2025-07-01',
        endDate: '2025-09-30',
        status: 'active',
        image: '/events/event3.jpg',
        applicableCinemas: [],
        requiredTier: 'vip',
    },
    {
        id: 4,
        code: 'SUMMER-GIVEAWAY-24',
        translations: [
            {
                locale: 'vi',
                name: 'Rút Thăm Hè Sôi Động 2024',
                description: 'Với mỗi hóa đơn trên 200.000đ, bạn sẽ nhận được một phiếu rút thăm trúng thưởng chuyến du lịch Nhật Bản.',
                terms: 'Chương trình đã kết thúc. Kết quả đã được công bố trên trang chủ.'
            },
            {
                locale: 'en',
                name: 'Exciting Summer Giveaway 2024',
                description: 'With every invoice over 200,000 VND, you received a raffle ticket for a chance to win a trip to Japan.',
                terms: 'This event has ended. The results have been announced on the homepage.'
            }
        ],
        type: 'giveaway',
        startDate: '2024-06-01',
        endDate: '2024-08-31',
        status: 'expired',
        image: '/events/event4.jpg',
        applicableCinemas: [],
    },
    {
        id: 5,
        code: 'BACK2SCHOOL-2025',
        translations: [
            {
                locale: 'vi',
                name: 'Tựu Trường Rộn Rã - Giảm Giá Học Sinh',
                description: 'Học sinh, sinh viên được giảm 15% trên giá vé khi xuất trình thẻ học sinh/sinh viên hợp lệ.',
                terms: 'Áp dụng cho vé 2D và 3D. Mỗi thẻ chỉ áp dụng cho 1 vé. Không áp dụng kèm các khuyến mãi khác.'
            },
            {
                locale: 'en',
                name: 'Back to School Fun - Student Discount',
                description: 'Students get a 15% discount on ticket prices upon presenting a valid student ID.',
                terms: 'Applies to 2D and 3D tickets. Each ID is valid for one ticket only. Cannot be combined with other promotions.'
            }
        ],
        type: 'discount',
        startDate: '2025-08-15',
        endDate: '2025-09-15',
        status: 'active', // Giả sử hôm nay là trong khoảng thời gian này
        image: '/events/event5.jpg',
        applicableCinemas: [],
    },
    {
        id: 6,
        code: 'AVATAR3-PREBOOK',
        translations: [
            {
                locale: 'vi',
                name: 'Đặt Vé Sớm AVATAR 3 - Nhận Ngay Bắp Nước',
                description: 'Đặt vé trước cho bom tấn AVATAR 3 để nhận miễn phí một combo bắp rang và nước ngọt cỡ vừa.',
                terms: 'Chương trình sẽ sớm được kích hoạt. Áp dụng cho 1000 khách hàng đầu tiên đặt vé online.'
            },
            {
                locale: 'en',
                name: 'AVATAR 3 Early Bird - Free Popcorn Combo',
                description: 'Pre-book your tickets for the blockbuster AVATAR 3 and receive a free medium popcorn and soft drink combo.',
                terms: 'This promotion will be activated soon. Applies to the first 1000 customers who book online.'
            }
        ],
        type: 'combo',
        startDate: '2025-11-20',
        endDate: '2025-12-18',
        status: 'inactive', // Chưa tới ngày diễn ra
        image: '/events/event6.jpg',
        applicableMovies: [5], // Chỉ áp dụng cho phim Avatar 3
    }
];

export const fnbItems: FnbItem[] = [
    {
        id: 1,
        code: 'POP-SALT-L',
        translations: [{ locale: 'vi', name: 'Bắp Rang Mặn Lớn' }, { locale: 'en', name: 'Large Salty Popcorn' }],
        type: 'popcorn',
        size: 'L',
        price: 75000,
        image: '/fnb/popcorn-salt.jpg'
    },
    {
        id: 2,
        code: 'COKE-M',
        translations: [{ locale: 'vi', name: 'Coca-Cola Vừa' }, { locale: 'en', name: 'Medium Coca-Cola' }],
        type: 'drink',
        size: 'M',
        price: 45000,
        image: '/fnb/coke.png'
    },
    {
        id: 3,
        code: 'COMBO-SINGLE-1',
        translations: [{ locale: 'vi', name: 'Combo 1 Người' }, { locale: 'en', name: 'Single Combo' }],
        type: 'combo',
        size: 'M',
        price: 110000,
        image: '/fnb/combo1.webp'
    },
    {
        id: 4,
        code: 'POP-CARAMEL-M',
        translations: [{ locale: 'vi', name: 'Bắp Rang Caramel Vừa' }, { locale: 'en', name: 'Medium Caramel Popcorn' }],
        type: 'popcorn',
        size: 'M',
        price: 80000,
        image: '/fnb/popcorn-caramel.webp'
    },
    {
        id: 5,
        code: 'POP-CHEESE-M',
        translations: [{ locale: 'vi', name: 'Bắp Rang Phô Mai Vừa' }, { locale: 'en', name: 'Medium Cheese Popcorn' }],
        type: 'popcorn',
        size: 'M',
        price: 80000,
        image: '/fnb/popcorn-cheese.jpg'
    },
    {
        id: 6,
        code: 'WATER-M',
        translations: [{ locale: 'vi', name: 'Nước Suối Vừa' }, { locale: 'en', name: 'Medium Mineral Water' }],
        type: 'drink',
        size: 'M',
        price: 25000,
        image: '/fnb/water.jpg'
    },
    {
        id: 7,
        code: 'SPRITE-L',
        translations: [{ locale: 'vi', name: 'Sprite Lớn' }, { locale: 'en', name: 'Large Sprite' }],
        type: 'drink',
        size: 'L',
        price: 50000,
        image: '/fnb/sprite.jpg'
    },
    {
        id: 8,
        code: 'COMBO-COUPLE-1',
        translations: [{ locale: 'vi', name: 'Combo 2 Người' }, { locale: 'en', name: 'Couple Combo' }],
        type: 'combo',
        size: 'L',
        price: 155000,
        image: '/fnb/combo2.webp'
    },
    {
        id: 9,
        code: 'SNACK-NACHOS',
        translations: [{ locale: 'vi', name: 'Bánh Nachos Phô Mai' }, { locale: 'en', name: 'Nachos with Cheese' }],
        type: 'snack',
        size: 'M',
        price: 65000,
        image: '/fnb/nachos.jpg'
    },
    {
        id: 10,
        code: 'SNACK-HOTDOG',
        translations: [{ locale: 'vi', name: 'Xúc Xích Hotdog' }, { locale: 'en', name: 'Hotdog' }],
        type: 'snack',
        size: 'M',
        price: 55000,
        image: '/fnb/hotdog.webp'
    }
];

export const soldInvoices: SoldInvoice[] = [
    {
        id: 1,
        code: 'INV-20250815-001',
        date: '2025-08-15',
        customerId: 3,
        staffId: 2,
        paymentMethod: 'cash',
        createdAt: '2025-08-15T18:30:00Z'
    },
    {
        id: 2,
        code: 'INV-20250816-002',
        date: '2025-08-16',
        customerId: 3,
        staffId: 2,
        paymentMethod: 'online',
        createdAt: '2025-08-16T10:00:00Z'
    }
];

export const tickets: Ticket[] = [
    {
        id: 1,
        price: 120000,
        movieScheduleId: 1,
        seatId: 35,
        soldInvoiceId: 1,
        status: 'paid',
        createdAt: '2025-08-15T18:30:00Z'
    },
    {
        id: 2,
        price: 80000,
        movieScheduleId: 4,
        seatId: 155,
        soldInvoiceId: 2,
        status: 'paid',
        createdAt: '2025-08-16T10:00:00Z'
    },
    {
        id: 3,
        price: 80000,
        movieScheduleId: 4,
        seatId: 156,
        soldInvoiceId: 2,
        status: 'paid',
        createdAt: '2025-08-16T10:00:00Z'
    }
];

export const soldFnbs: SoldFnb[] = [
    {
        id: 1,
        soldInvoiceId: 2,
        fnbItemId: 1,
        quantity: 1,
        pricePerItem: 75000
    },
    {
        id: 2,
        soldInvoiceId: 2,
        fnbItemId: 2,
        quantity: 2,
        pricePerItem: 45000
    }
];
