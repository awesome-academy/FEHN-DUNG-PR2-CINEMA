import type {
    User, Genre, Movie,
    Cinema, Screen, Seat,
    TimeSlot, MovieSchedule,
    SoldInvoice, Ticket, Rating
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
        tier: 'member',
        status: 'active',
        createdAt: '2025-07-03T11:00:00Z'
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
        status: 'ended',
        directors: ['Denis Villeneuve'],
        casts: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Austin Butler'],
        ratings: []
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
        status: 'ended',
        directors: ['Jon Watts'],
        casts: ['Tom Holland', 'Zendaya', 'Benedict Cumberbatch', 'Willem Dafoe'],
        ratings: []
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
        ratings: []
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
        posterImg: '/posters/MV4.jpg',
        trailer: 'https://www.youtube.com/watch?v=lV1OOlGwExM',
        releaseDate: '2024-03-29',
        status: 'ended',
        directors: ['Adam Wingard'],
        casts: ['Rebecca Hall', 'Brian Tyree Henry', 'Dan Stevens'],
        ratings: []
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
        posterImg: '/posters/MV5.jpg',
        trailer: 'https://www.youtube.com/watch?v=9cGDhDB7898',
        releaseDate: '2025-12-19',
        status: 'coming_soon',
        directors: ['James Cameron'],
        casts: ['Sam Worthington', 'Zoe Saldaña', 'Sigourney Weaver', 'Michelle Yeoh'],
        ratings: []
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
        status: 'ended',
        directors: ['Christopher Nolan'],
        casts: ['Cillian Murphy', 'Emily Blunt', 'Matt Damon', 'Robert Downey Jr.'],
        ratings: []
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
        status: 'ended',
        directors: ['Daniel Kwan', 'Daniel Scheinert'],
        casts: ['Michelle Yeoh', 'Ke Huy Quan', 'Stephanie Hsu', 'Jamie Lee Curtis'],
        ratings: []
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
        status: 'ended',
        directors: ['Joseph Kosinski'],
        casts: ['Tom Cruise', 'Miles Teller', 'Jennifer Connelly', 'Jon Hamm'],
        ratings: []
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
        posterImg: '/posters/MV9.jpg',
        trailer: 'https://www.youtube.com/watch?v=_OKAwz2MsJs',
        releaseDate: '2024-10-04',
        status: 'ended',
        directors: ['Todd Phillips'],
        casts: ['Joaquin Phoenix', 'Lady Gaga', 'Zazie Beetz', 'Brendan Gleeson'],
        ratings: []
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
        ratings: []
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
        posterImg: '/posters/MV11.jpg',
        trailer: 'https://www.youtube.com/watch?v=LEjhY15eCx0',
        releaseDate: '2024-06-14',
        status: 'ended',
        directors: ['Kelsey Mann'],
        casts: ['Amy Poehler', 'Maya Hawke', 'Kensington Tallman', 'Liza Lapira'],
        ratings: []
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
        ratings: []
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
        ratings: []
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
        posterImg: '/posters/MV14.jpg',
        trailer: 'https://www.youtube.com/watch?v=L3pk_TBkihU',
        releaseDate: '2020-09-03',
        status: 'ended',
        directors: ['Christopher Nolan'],
        casts: ['John David Washington', 'Robert Pattinson', 'Elizabeth Debicki', 'Kenneth Branagh'],
        ratings: []
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
        posterImg: '/posters/MV15.jpg',
        trailer: 'https://www.youtube.com/watch?v=_Z3QKkl1WyM',
        releaseDate: '2022-11-11',
        status: 'ended',
        directors: ['Ryan Coogler'],
        casts: ['Letitia Wright', 'Lupita Nyong\'o', 'Danai Gurira', 'Tenoch Huerta Mejía'],
        ratings: []
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
        posterImg: '/posters/MV16.jpg',
        trailer: 'https://www.youtube.com/watch?v=xOsLIiBStEs',
        releaseDate: '2020-12-25',
        status: 'ended',
        directors: ['Pete Docter', 'Kemp Powers'],
        casts: ['Jamie Foxx', 'Tina Fey', 'Graham Norton', 'Rachel House'],
        ratings: []
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
        posterImg: '/posters/MV17.jpg',
        trailer: 'https://www.youtube.com/watch?v=4rgYUipGJNo',
        releaseDate: '2024-11-22',
        status: 'ended',
        directors: ['Ridley Scott'],
        casts: ['Paul Mescal', 'Denzel Washington', 'Connie Nielsen', 'Pedro Pascal'],
        ratings: []
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
        status: 'ended',
        directors: ['Jon M. Chu'],
        casts: ['Cynthia Erivo', 'Ariana Grande', 'Jonathan Bailey', 'Michelle Yeoh'],
        ratings: []
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
        status: 'now_showing',
        directors: ['James Gunn'],
        casts: ['David Corenswet', 'Rachel Brosnahan', 'Nicholas Hoult', 'Isabela Merced'],
        ratings: []
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
        ratings: []
    }
];

export const cinemas: Cinema[] = [
    {
        id: 1,
        translations: [
            {
                locale: 'vi',
                name: 'CGV Vincom Center Bà Triệu',
                description: 'Cụm rạp chiếu phim tiêu chuẩn quốc tế của CGV tại trung tâm thương mại Vincom, Hà Nội.'
            },
            {
                locale: 'en',
                name: 'CGV Vincom Center Ba Trieu',
                description: 'An international standard cinema complex of CGV at Vincom shopping center, Hanoi.'
            }
        ],
        address: 'Tầng 6, Vincom Center, 191 Bà Triệu, Hai Bà Trưng, Hà Nội',
        image: '/cinema/cgv.jpg'
    },
    {
        id: 2,
        translations: [
            {
                locale: 'vi',
                name: 'BHD Star Discovery Cầu Giấy',
                description: 'Rạp chiếu phim BHD Star tại quận Cầu Giấy, với nhiều phòng chiếu hiện đại.'
            },
            {
                locale: 'en',
                name: 'BHD Star Discovery Cau Giay',
                description: 'BHD Star cinema in Cau Giay district, with multiple modern screens.'
            }
        ],
        address: 'Tầng 8, TTTM Discovery, 302 Cầu Giấy, Dịch Vọng, Cầu Giấy, Hà Nội',
        image: '/cinema/bhd.jpg'
    },
    {
        id: 3,
        translations: [
            {
                locale: 'vi',
                name: 'Lotte Cinema Landmark 72',
                description: 'Cụm rạp Lotte Cinema sang trọng nằm trong tòa nhà cao nhất Hà Nội.'
            },
            {
                locale: 'en',
                name: 'Lotte Cinema Landmark 72',
                description: 'A luxurious Lotte Cinema complex located in Hanoi\'s tallest building.'
            }
        ],
        address: 'Tầng 5, Keangnam Hanoi Landmark 72, Lô E6, Khu đô thị mới Cầu Giấy, Mễ Trì, Nam Từ Liêm, Hà Nội',
        image: '/cinema/lotte.jpg'
    }
];

export const screens: Screen[] = [
    // CGV Screens
    { id: 1, name: 'Screen 1', cinemaId: 1, capacity: 50, type: 'IMAX' },
    { id: 2, name: 'Screen 2', cinemaId: 1, capacity: 50, type: 'standard' },
    { id: 3, name: 'Screen 3', cinemaId: 1, capacity: 50, type: 'VIP' },

    // BHD Star Screens
    { id: 4, name: 'Screen 1', cinemaId: 2, capacity: 50, type: '3D' },
    { id: 5, name: 'Screen 2', cinemaId: 2, capacity: 50, type: 'standard' },
    { id: 6, name: 'Screen 3', cinemaId: 2, capacity: 50, type: 'standard' },

    // Lotte Cinema Screens
    { id: 7, name: 'Screen 1', cinemaId: 3, capacity: 50, type: '4D' },
    { id: 8, name: 'Screen 2', cinemaId: 3, capacity: 50, type: 'VIP' },
    { id: 9, name: 'Screen 3', cinemaId: 3, capacity: 50, type: 'standard' }
];

const generateSeatsForScreen = (screenId: number, startSeatId: number): { seats: Seat[], nextSeatId: number } => {
    const seats: Seat[] = [];
    const rows = ['A', 'B', 'C', 'D', 'E'];
    const columns = 10;
    let currentSeatId = startSeatId;

    for (const row of rows) {
        for (let col = 1; col <= columns; col++) {
            seats.push({
                id: currentSeatId,
                screenId: screenId,
                row: row,
                column: col.toString(),
                // Trạng thái có sẵn ngẫu nhiên, khoảng 70% ghế có sẵn
                isAvailable: Math.random() > 0.3
            });
            currentSeatId++;
        }
    }
    return { seats, nextSeatId: currentSeatId };
};

const generateAllSeats = (): Seat[] => {
    let allSeats: Seat[] = [];
    let nextSeatId = 1;

    for (const screen of screens) {
        const result = generateSeatsForScreen(screen.id, nextSeatId);
        allSeats = allSeats.concat(result.seats);
        nextSeatId = result.nextSeatId;
    }

    return allSeats;
};

export const seats: Seat[] = generateAllSeats();

const createTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const dates = ['2025-08-11', '2025-08-12', '2025-08-13', '2025-08-14', '2025-08-15', '2025-08-16', '2025-08-17'];
    const startTimes = ['09:00', '11:30', '14:00', '16:30', '19:00', '21:30'];
    let id = 1;
    for (const date of dates) {
        for (const startTime of startTimes) {
            // Giả định thời lượng phim trung bình là 2.5 giờ
            const [hour, minute] = startTime.split(':').map(Number);
            if (hour === undefined || isNaN(hour) || minute === undefined || isNaN(minute)) continue;
            const end = new Date();
            end.setHours(hour, minute + 150, 0, 0); // Thêm 150 phút
            const endTime = `${end.getHours().toString().padStart(2, '0')}:${end.getMinutes().toString().padStart(2, '0')}`;

            slots.push({ id, startTime, endTime, date });
            id++;
        }
    }
    return slots;
};

const createMovieSchedules = (allTimeSlots: TimeSlot[]): MovieSchedule[] => {
    const schedules: MovieSchedule[] = [];
    let scheduleId = 1;
    const usedScreenTime = new Set<string>(); // Để tránh trùng lặp lịch chiếu (screenId + timeSlotId)
    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10);

    // Lọc các khung giờ cho phim đã chiếu, đang chiếu
    const pastTimeSlots = allTimeSlots.filter(ts => ts.date < todayStr);
    const nowShowingTimeSlots = allTimeSlots.filter(ts => ts.date >= todayStr);

    // Lấy danh sách phim theo trạng thái
    const endedMovies = movies.filter(m => m.status === 'ended');
    const nowShowingMovies = movies.filter(m => m.status === 'now_showing');

    // Tạo lịch cho phim đang chiếu
    for (const movie of nowShowingMovies) {
        for (const cinema of cinemas) {
            const cinemaScreens = screens.filter(s => s.cinemaId === cinema.id);
            // Tạo 2 lịch chiếu ngẫu nhiên cho mỗi phim ở mỗi rạp
            for (let i = 0; i < 2; i++) {
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
    }

    // Tạo lịch cho phim đã kết thúc
    for (const movie of endedMovies) {
        // Chỉ tạo lịch cho 1 rạp ngẫu nhiên để giảm số lượng
        const cinema = cinemas[Math.floor(Math.random() * cinemas.length)];
        if (!cinema) continue;
        const cinemaScreens = screens.filter(s => s.cinemaId === cinema.id);
        const screen = cinemaScreens[Math.floor(Math.random() * cinemaScreens.length)];
        const timeSlot = pastTimeSlots[Math.floor(Math.random() * pastTimeSlots.length)];
        if (!screen || !timeSlot) continue;
        const key = `${screen.id}-${timeSlot.id}`;
        if (!usedScreenTime.has(key)) {
            schedules.push({ id: scheduleId++, cinemaId: cinema.id, movieId: movie.id, screenId: screen.id, timeSlotId: timeSlot.id });
            usedScreenTime.add(key);
        }
    }
    return schedules;
};

export const timeSlots: TimeSlot[] = createTimeSlots();

export const movieSchedules: MovieSchedule[] = createMovieSchedules(timeSlots);
