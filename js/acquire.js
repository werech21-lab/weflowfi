(function () {
  const EMAILS = ["senshy1500@gmail.com", "werech21@gmail.com"];
  const WHATSAPP = "96597378148";
  const SNIPES = "flowfi.snipes.v1";
  const $ = (id) => document.getElementById(id);
  const lang = () => (document.documentElement.lang === "en" ? "en" : "ar");
  const say = (ar, en) => (lang() === "ar" ? ar : en);
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[ch]));

  const NICHES = {
    perfume: {
      ar: "عطور",
      en: "Fragrance",
      plan: {
        ar: [
          "سجل يومي على تيليجرام: كل بيع نقدي، كل عينة خرجت، وكل فاتورة مورد تُقرأ من الصورة وتُراجع قبل الاعتماد.",
          "لوحة فرع واحدة تُظهر الدفعة الناقصة، والعميل الذي حجز ولم يُغلق، والصنف الذي اقترب من النفاد.",
          "المسار مصمم ليختصر ساعات الجرد والواتساب المتفرق، ويرفع سرعة إغلاق الطلب داخل نفس الوردية."
        ],
        en: [
          "A Telegram daybook: every cash sale, every sample that left, and every supplier bill read from a photo and reviewed before it is posted.",
          "One branch console for the batch that is short, the client who reserved and did not close, and the item nearing stock-out.",
          "The path is designed to remove hours of stock-taking and scattered WhatsApp, and to close the order faster inside the same shift."
        ]
      },
      reel: {
        hook: {
          ar: (name) => name + " لا يُرش. يُلبس.",
          en: (name) => name + " is not sprayed. It is worn."
        },
        scene: {
          ar: "9:16. زجاجة على رخام أسود، ضوء ذهبي جانبي، يد تضع الغطاء ببطء، ثم اقتراب من العنق. بدون شعار مزدحم.",
          en: "9:16. Bottle on black marble, a side gold light, a hand setting the cap slowly, then a move toward the neck. No crowded logo."
        },
        voice: {
          ar: (name) => "إذا دخل " + name + " المكان، الحديث يتأخر ثانيتين. الدفعة محدودة. الحجز قبل النفاد.",
          en: (name) => "When " + name + " enters the room, the conversation waits two seconds. The batch is limited. Reserve it before it is gone."
        },
        caption: {
          ar: (name) => name + " · دفعة محدودة. احجز عطرك قبل أن تُغلق الدفعة. واتساب في البايو.",
          en: (name) => name + " · a limited batch. Reserve it before the batch closes. WhatsApp in the bio."
        }
      }
    },
    restaurant: {
      ar: "مطاعم",
      en: "Restaurants",
      plan: {
        ar: [
          "طلب الفرع، المطبخ، والتوصيل في نظام واحد: الطاولة، الطلب الخارجي، ونقص الصنف يصلان للإدارة بدون مكالمات متقطعة.",
          "بوت يسجّل مصروف المورد وصور الفواتير من رسالة الموظف، ويجهّز السجل للمراجعة لا للاعتماد الأعمى.",
          "المسار مصمم ليختصر ساعات المطابقة آخر الليل، ويُسرّع خروج الطلب من المطبخ إلى العميل."
        ],
        en: [
          "Branch order, kitchen, and delivery in one system: the table, the outside order, and the missing item reach management without broken phone calls.",
          "A bot records the supplier expense and the bill photo from the staff message, and prepares the record for review rather than blind posting.",
          "The path is designed to remove the late-night reconciliation hours and to move the order from kitchen to guest faster."
        ]
      },
      reel: {
        hook: {
          ar: (name) => "في " + name + " الطلب لا يضيع بين المكالمات.",
          en: (name) => "At " + name + " the order does not get lost between calls."
        },
        scene: {
          ar: "9:16. مقلاة أو طبق يُجهَّز، ثم شاشة طلب مختصرة، ثم كيس يخرج للعميل. لقطة واحدة لكل خطوة. صوت المطبخ طبيعي.",
          en: "9:16. A pan or plate being finished, then a short order screen, then a bag leaving for the guest. One shot per step. Natural kitchen sound."
        },
        voice: {
          ar: (name) => "من الطلب إلى الباب، " + name + " يُغلقها بدون ما يتوه الرقم. اطلب الآن، والفرع جاهز.",
          en: (name) => "From the order to the door, " + name + " closes it without losing the number. Order now. The branch is ready."
        },
        caption: {
          ar: (name) => name + " · طلبك يخرج مرتباً. أرسل موقعك على واتساب أو اطلب من الرابط.",
          en: (name) => name + " · your order leaves in order. Send your location on WhatsApp or order from the link."
        }
      }
    },
    realestate: {
      ar: "عقارات",
      en: "Real estate",
      plan: {
        ar: [
          "ملف كل وحدة: السعر، الحالة، العميل المهتم، والموعد، في لوحة واحدة بدل ملفات متفرقة على الجوال.",
          "متابعة تلقائية بعد المعاينة: رسالة، موعد ثانٍ، والمستندات المطلوبة، بدون أن يسقط العميل بعد الزيارة.",
          "المسار مصمم ليختصر ساعات البحث في المحادثات، ويُسرّع انتقال الوحدة من استفسار إلى حجز."
        ],
        en: [
          "One file per unit: price, status, the interested client, and the appointment, on one console instead of scattered phone files.",
          "An automatic follow-up after the viewing: a message, a second appointment, and the documents required, so the client does not vanish after the visit.",
          "The path is designed to remove hours of searching through chats and to move a unit from inquiry to reservation faster."
        ]
      },
      reel: {
        hook: {
          ar: (name) => "هذه الوحدة لن تبقى في " + name + " للأسبوع القادم.",
          en: (name) => "This unit will not stay at " + name + " for next week."
        },
        scene: {
          ar: "9:16. مدخل، ثم نافذة، ثم تفصيلة مادة. حركة كاميرا بطيئة. في النهاية بطاقة سعر قصيرة بدون ازدحام أرقام.",
          en: "9:16. Entrance, then a window, then a material detail. A slow camera move. A short price card at the end, without a crowd of numbers."
        },
        voice: {
          ar: (name) => "الموقع واضح. التشطيب واضح. " + name + " يفتح المعاينة هذا الأسبوع لعدد محدود.",
          en: (name) => "The location is clear. The finish is clear. " + name + " opens viewings this week for a limited number."
        },
        caption: {
          ar: (name) => name + " · معاينة خاصة هذا الأسبوع. أرسل «وحدة» على واتساب لتحديد الموعد.",
          en: (name) => name + " · a private viewing this week. Send “unit” on WhatsApp to set the time."
        }
      }
    },
    ecommerce: {
      ar: "تجارة إلكترونية",
      en: "E-commerce",
      plan: {
        ar: [
          "مخزون، طلب، وتحصيل في نظام واحد: ما نُقص، ما تأخر شحنه، وما دُفع يظهر قبل أن يسأل العميل.",
          "بوت يسجّل مرتجعات اليوم وملاحظات الشحن من رسالة الفريق، ويربطها برقم الطلب.",
          "المسار مصمم ليختصر ساعات مطابقة المتجر مع الشيت، ويُسرّع خروج الشحنة في نفس اليوم."
        ],
        en: [
          "Stock, order, and collection in one system: what is short, what is late to ship, and what was paid shows before the customer asks.",
          "A bot records the day’s returns and shipping notes from the team message and ties them to the order number.",
          "The path is designed to remove the hours of matching the store to a sheet, and to get the shipment out the same day."
        ]
      },
      reel: {
        hook: {
          ar: (name) => "من " + name + " إلى بابك، بدون ما تسأل: وين طلبي؟",
          en: (name) => "From " + name + " to your door, without asking where the order is."
        },
        scene: {
          ar: "9:16. منتج على خلفية داكنة، ثم تغليف، ثم ملصق شحن يُلصق. ثلاث لقطات فقط. المنتج هو البطل.",
          en: "9:16. Product on a dark ground, then packing, then a shipping label being applied. Three shots only. The product leads."
        },
        voice: {
          ar: (name) => "اخترناه. غلّفناه. " + name + " يطلع الطلب اليوم. الكمية المعروضة هي الموجودة.",
          en: (name) => "Chosen. Packed. " + name + " sends the order today. The quantity on screen is the quantity in hand."
        },
        caption: {
          ar: (name) => name + " · الكمية ظاهرة لأنها حقيقية. اطلب الآن قبل ما يُغلق المقاس أو اللون.",
          en: (name) => name + " · the quantity is visible because it is real. Order before the size or color closes."
        }
      }
    },
    services: {
      ar: "خدمات",
      en: "Services",
      plan: {
        ar: [
          "ملف عميل من أول استفسار إلى الفاتورة: الموعد، نطاق العمل، والدفعة، بدون أن يعيش الطلب داخل محادثة واحدة.",
          "تذكير بالمستحق والمتابعة بعد التسليم، ويصل للإدارة ما تأخر فقط.",
          "المسار مصمم ليختصر ساعات المتابعة اليدوية، ويُسرّع انتقال العميل من سؤال إلى عقد."
        ],
        en: [
          "A client file from the first inquiry to the invoice: the appointment, the scope, and the payment, so the job does not live inside one chat.",
          "A reminder for what is due and for the follow-up after delivery. Management sees only what is late.",
          "The path is designed to remove hours of manual chasing and to move a client from a question to a contract faster."
        ]
      },
      reel: {
        hook: {
          ar: (name) => "في " + name + " الخدمة تُغلق بموعد، لا بوعد.",
          en: (name) => "At " + name + " the service closes with an appointment, not a promise."
        },
        scene: {
          ar: "9:16. يد تعمل، ثم شاشة موعد، ثم تسليم مختصر. خلفية هادئة. وجه العميل اختياري وغير مطلوب.",
          en: "9:16. Hands at work, then an appointment screen, then a short handover. A quiet background. The client’s face is optional and not required."
        },
        voice: {
          ar: (name) => "نحدد النطاق. نحدد الوقت. " + name + " يسلّم الشغل وفي اليد موعد واضح للخطوة التالية.",
          en: (name) => "Scope set. Time set. " + name + " hands the work over with a clear time for the next step."
        },
        caption: {
          ar: (name) => name + " · احجز الاستشارة. نرد بالموعد والنطاق، لا برسالة عامة.",
          en: (name) => name + " · book the consult. The reply is a time and a scope, not a generic message."
        }
      }
    },
    apps: {
      ar: "تطبيقات",
      en: "Apps",
      plan: {
        ar: [
          "نسخة أولى من التطبيق أو المنصة: حساب، المسار الأساسي، ولوحة إدارة، من الصفر حتى إطلاق يمكن تجربته.",
          "أتمتة الخلفية: التسجيل، التنبيه، والدفعة، حتى لا يبقى الفريق ينقل البيانات باليد بعد الإطلاق.",
          "المسار مصمم ليختصر أسابيع التخبط في الخصائص، ويُسرّع وصول النسخة الأولى إلى مستخدم حقيقي."
        ],
        en: [
          "A first version of the app or platform: account, the core path, and an admin console, from zero to a launch that can be tried.",
          "Back-office automation: capture, alerts, and payment, so the team is not copying data by hand after launch.",
          "The path is designed to remove weeks of wandering through features and to put a first version in front of a real user faster."
        ]
      },
      reel: {
        hook: {
          ar: (name) => name + " لا يُشرح في اجتماع. يُفتح على الجوال.",
          en: (name) => name + " is not explained in a meeting. It opens on the phone."
        },
        scene: {
          ar: "9:16. جوال في يد، ثلاث شاشات فقط من المسار الأساسي، ثم إصبع يضغط الإجراء الأخير. خلفية داكنة ونص قصير.",
          en: "9:16. A phone in hand, only three screens of the core path, then a finger pressing the last action. Dark ground and a short line."
        },
        voice: {
          ar: (name) => "افتح. نفّذ. خلّص. " + name + " بُني للخطوة التي تتكرر كل يوم.",
          en: (name) => "Open. Do. Finish. " + name + " is built for the step that repeats every day."
        },
        caption: {
          ar: (name) => name + " · النسخة الأولى تركز على مسار واحد يشتغل. اطلب العرض إذا كان هذا مسارك.",
          en: (name) => name + " · the first version focuses on one path that works. Ask for the proposal if this is your path."
        }
      }
    }
  };

  const PAIN = {
    content: {
      ar: "ضعف المحتوى والريلز",
      en: "weak content and reels",
      offer: {
        ar: "سكريبت ريل أول يمكن تصويره هذا الأسبوع، مع غلاف ونص بيع، مربوط باسم الشركة لا بقالب عام.",
        en: "A first reel script that can be shot this week, with a cover and sales line, written for the company rather than a generic template."
      }
    },
    automation: {
      ar: "غياب الأتمتة",
      en: "no automation in the daily work",
      offer: {
        ar: "مساعد تشغيلي يسجّل البيع والمصروف والمتابعة من الرسالة، ويجهّز السجل للمراجعة.",
        en: "An operations assistant that records the sale, the expense, and the follow-up from a message, and prepares the record for review."
      }
    },
    saas: {
      ar: "الحاجة إلى تطبيق أو نظام SaaS",
      en: "the need for an app or a SaaS system",
      offer: {
        ar: "نسخة نظام أولى: حسابات، المسار الذي يتكرر، ولوحة إدارة، من الصفر حتى إطلاق يمكن تجربته.",
        en: "A first system version: accounts, the path that repeats, and an admin console, from zero to a launch that can be tried."
      }
    },
    all: {
      ar: "المحتوى والأتمتة والنظام معاً",
      en: "content, automation, and the system together",
      offer: {
        ar: "ثلاثة أشياء جاهزة للنقاش: سكريبت ريل أول، مساعد تشغيلي، ونطاق نسخة النظام الأولى.",
        en: "Three things ready to discuss: a first reel script, an operations assistant, and the scope of the first system version."
      }
    }
  };

  let report = null;
  let sending = false;
  let vip = { name: "", niche: "", pain: "" };
  let snipe = null;

  function clean(value, max) {
    return String(value || "").replace(/[\u0000-\u001F<>]/g, " ").replace(/\s+/g, " ").trim().slice(0, max || 80);
  }

  function nicheOf(key) {
    return NICHES[key] || NICHES.services;
  }

  function readVip() {
    const params = new URLSearchParams(window.location.search);
    vip = {
      name: clean(params.get("vip"), 80),
      niche: clean(params.get("niche"), 40),
      pain: clean(params.get("pain"), 20)
    };
  }

  function applyVipForm() {
    if (!vip.name) return;
    const name = $("xrayName");
    const niche = $("xrayNiche");
    if (name && !name.value) name.value = vip.name;
    if (niche && NICHES[vip.niche]) niche.value = vip.niche;
  }

  function renderVip() {
    const banner = $("vipBanner");
    const title = $("vipGreeting");
    const detail = $("vipDetail");
    if (!banner || !title || !detail) return;
    if (!vip.name) {
      banner.hidden = true;
      return;
    }
    const niche = NICHES[vip.niche];
    const pain = PAIN[vip.pain];
    title.textContent = say(
      "مرحباً بإدارة " + vip.name + " — تم تجهيز خطة التطوير البرمجي والتسويقي الخاصة بكم",
      "Welcome, the team at " + vip.name + " — your software and marketing plan is prepared"
    );
    const bits = [];
    if (niche) bits.push(say(niche.ar, niche.en));
    if (pain) bits.push(say(pain.ar, pain.en));
    detail.textContent = bits.join(" · ");
    banner.hidden = false;
  }

  function buildReport(name, key) {
    const niche = nicheOf(key);
    const plan = {
      ar: niche.plan.ar.map((line) => line),
      en: niche.plan.en.map((line) => line)
    };
    plan.ar[0] = name + ": " + plan.ar[0];
    plan.en[0] = name + ": " + plan.en[0];
    return {
      name,
      key,
      niche,
      plan,
      reel: {
        hook: { ar: niche.reel.hook.ar(name), en: niche.reel.hook.en(name) },
        scene: niche.reel.scene,
        voice: { ar: niche.reel.voice.ar(name), en: niche.reel.voice.en(name) },
        caption: { ar: niche.reel.caption.ar(name), en: niche.reel.caption.en(name) }
      }
    };
  }

  function reelRows(item) {
    const rows = [
      [say("الخطاف", "Hook"), item.reel.hook[lang()]],
      [say("المشهد", "Visual scene"), item.reel.scene[lang()]],
      [say("التعليق الصوتي", "Voiceover"), item.reel.voice[lang()]],
      [say("الكابشن", "Caption"), item.reel.caption[lang()]]
    ];
    return rows.map((row) => '<p class="reel-label">' + esc(row[0]) + "</p><p>" + esc(row[1]) + "</p>").join("");
  }

  function renderReport() {
    const root = $("xrayResult");
    if (!root) return;
    if (!report) {
      root.hidden = true;
      return;
    }
    const plan = report.plan[lang()].map((line) => "<li>" + esc(line) + "</li>").join("");
    root.hidden = false;
    root.innerHTML = '<article class="report-card">'
      + '<p class="eyebrow">FlowFi · ' + esc(say("تقرير تنفيذي", "Executive report")) + "</p>"
      + "<h3>" + esc(report.name) + " · " + esc(say(report.niche.ar, report.niche.en)) + "</h3>"
      + '<div class="report-block"><p class="reel-label">' + esc(say("خطة الأتمتة والـ SaaS", "Automation and SaaS plan")) + "</p><ul class=\"ticks\">" + plan + "</ul></div>"
      + '<div class="reel-sheet"><p class="reel-label">' + esc(say("هدية تسويقية · سكريبت ريل جاهز للتصوير", "Marketing gift · reel script ready to shoot")) + "</p>" + reelRows(report) + "</div>"
      + '<p class="soft">' + esc(say("خطة توجيهية وسكريبت تصوير. التنفيذ يُعتمد مع المهندس قبل أي بناء.", "A directional plan and a shoot script. Execution is confirmed with the engineer before any build.")) + "</p>"
      + '<button class="btn btn-gold" type="button" id="xrayAdopt">' + esc(say("اعتمد تنفيذ هذه الخطة مع مهندس FlowFi الآن", "Adopt this plan with the FlowFi engineer now")) + "</button>"
      + '<p class="soft" id="xrayStatus"></p>'
      + "</article>";
  }

  function brief(order) {
    const plan = (order.scope && order.scope.ar || []).map((line) => "- " + line).join("\n");
    const reel = order.reel || {};
    return [
      "🔔 فحص ذكي جديد من موقع WeFlowFi!",
      "رقم الطلب: " + order.id,
      "",
      "👤 المشروع: " + order.name,
      "📱 واتساب: " + order.phone,
      "🛠 المجال: " + ((order.serviceLabel && order.serviceLabel.ar) || ""),
      "",
      "📋 خطة الأتمتة والـ SaaS:",
      plan,
      "",
      "🎬 سكريبت الريل:",
      "الخطاف: " + ((reel.hook && reel.hook.ar) || ""),
      "المشهد: " + ((reel.scene && reel.scene.ar) || ""),
      "الصوت: " + ((reel.voice && reel.voice.ar) || ""),
      "الكابشن: " + ((reel.caption && reel.caption.ar) || "")
    ].join("\n");
  }

  function waText(order) {
    return [
      "فحص FlowFi " + order.id,
      order.name + " | " + order.phone,
      (order.serviceLabel && order.serviceLabel.ar) || "",
      (order.scope && order.scope.ar || []).slice(0, 3).map((line) => "- " + line).join("\n"),
      "الخطاف: " + ((order.reel && order.reel.hook && order.reel.hook.ar) || "")
    ].filter(Boolean).join("\n");
  }

  function makeOrder(item, phone) {
    const stamp = new Date();
    const order = {
      id: "XR-" + stamp.getFullYear() + String(stamp.getMonth() + 1).padStart(2, "0") + String(stamp.getDate()).padStart(2, "0") + "-" + Math.random().toString(36).slice(2, 6).toUpperCase(),
      createdAt: stamp.toISOString(),
      lang: lang(),
      name: item.name,
      company: item.name,
      phone: phone,
      email: "",
      service: "xray",
      serviceLabel: { ar: "فحص ذكي · " + item.niche.ar, en: "Business X-ray · " + item.niche.en },
      idea: item.plan.ar.join("\n"),
      scope: { ar: item.plan.ar, en: item.plan.en },
      reel: item.reel,
      budgetText: "فحص مجاني — بانتظار اعتماد التنفيذ",
      timelineLabel: { ar: "الخطة جاهزة الآن", en: "The plan is ready now" },
      timeline: "الخطة جاهزة الآن",
      transcript: [
        { role: "client", ar: item.name + " · " + item.niche.ar + " · " + phone, en: item.name + " · " + item.niche.en + " · " + phone },
        { role: "agent", ar: item.plan.ar.join("\n"), en: item.plan.en.join("\n") },
        { role: "agent", ar: "سكريبت الريل\n" + item.reel.hook.ar + "\n" + item.reel.scene.ar + "\n" + item.reel.voice.ar + "\n" + item.reel.caption.ar, en: "Reel script\n" + item.reel.hook.en + "\n" + item.reel.scene.en + "\n" + item.reel.voice.en + "\n" + item.reel.caption.en }
      ],
      status: "new",
      channels: { room: "saved", telegram: "pending", email: "pending", whatsapp: "pending" },
      notifyEmails: EMAILS.slice(),
      internalNote: ""
    };
    order.briefText = brief(order);
    order.waText = waText(order);
    return order;
  }

  async function adopt() {
    if (!report || sending) return;
    const phone = clean($("xrayPhone") && $("xrayPhone").value, 20);
    if (!/^[0-9+\s()-]{8,}$/.test(phone)) {
      if (window.FlowFiRoom) window.FlowFiRoom.toast(say("أضف رقم واتساب واضح.", "Add a clear WhatsApp number."));
      return;
    }
    sending = true;
    const button = $("xrayAdopt");
    if (button) button.disabled = true;
    const order = makeOrder(report, phone);
    if (window.FlowFiDeal && window.FlowFiDeal.openMailbox) window.FlowFiDeal.openMailbox(order);
    const url = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(order.waText);
    window.open(url, "_blank", "noopener,noreferrer");
    remember(order);
    let channels = { telegram: "failed", email: "failed", webhook: "skipped" };
    if (window.FlowFiDeal && window.FlowFiDeal.notify) {
      try { channels = await window.FlowFiDeal.notify(order); } catch (err) { channels = { telegram: "failed", email: "failed" }; }
    }
    order.channels = { room: "saved", telegram: channels.telegram, email: channels.email, whatsapp: "opened", webhook: channels.webhook || "skipped" };
    remember(order);
    const status = $("xrayStatus");
    if (status) {
      status.textContent = say(
        "وصلت الخطة إلى غرفة الطلبات. تيليجرام: " + order.channels.telegram + " · البريد: فُتح تطبيق البريد على هذا الجهاز (FormSubmit: " + order.channels.email + ") · واتساب فُتح بالملخص.",
        "The plan is in the deal room. Telegram: " + order.channels.telegram + " · Email: the mail app opened on this device (FormSubmit: " + order.channels.email + ") · WhatsApp opened with the summary."
      );
    }
    sending = false;
    if (button) button.disabled = false;
  }

  function remember(order) {
    const key = "flowfi.leads.v1";
    let leads = [];
    try {
      const parsed = JSON.parse(localStorage.getItem(key));
      leads = Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      leads = [];
    }
    const index = leads.findIndex((item) => item.id === order.id);
    if (index >= 0) leads[index] = order;
    else leads.unshift(order);
    localStorage.setItem(key, JSON.stringify(leads));
    if (window.FlowFiRoom) window.FlowFiRoom.refresh();
  }

  function wait(ms) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return new Promise((resolve) => setTimeout(resolve, reduce ? 40 : ms));
  }

  async function analyze(event) {
    event.preventDefault();
    const site = $("xraySite");
    if (site && site.value) return;
    const name = clean($("xrayName").value, 80);
    const key = $("xrayNiche").value;
    const phone = clean($("xrayPhone").value, 20);
    const error = $("xrayError");
    const bad = name.length < 2 || !NICHES[key] || !/^[0-9+\s()-]{8,}$/.test(phone);
    if (error) {
      error.hidden = !bad;
      error.textContent = bad ? say("اكتب اسم المشروع، المجال، ورقم واتساب صحيح.", "Add the project name, the field, and a valid WhatsApp number.") : "";
    }
    if (bad) return;
    const button = $("xraySubmit");
    if (button) button.disabled = true;
    if (error) error.hidden = true;
    await wait(700);
    report = buildReport(name, key);
    renderReport();
    const result = $("xrayResult");
    if (result) result.scrollIntoView({ behavior: "smooth", block: "nearest" });
    if (button) button.disabled = false;
  }

  function vipLink(name, niche, pain) {
    const url = new URL(window.location.href);
    url.hash = "";
    url.search = "";
    url.searchParams.set("vip", name);
    url.searchParams.set("niche", niche);
    if (pain) url.searchParams.set("pain", pain);
    return url.toString();
  }

  function snipeMessage(name, nicheKey, painKey, link) {
    const niche = nicheOf(nicheKey);
    const pain = PAIN[painKey] || PAIN.all;
    const ar = [
      "إدارة " + name + "،",
      "",
      "أنا مهندس الأنظمة في FlowFi من الكويت. راجعت مسار " + niche.ar + " لديكم، والنقطة التي تستحق البناء الآن هي " + pain.ar + ".",
      "",
      "جهّزت لكم مساراً محدداً، لا عرضاً عاماً:",
      pain.offer.ar,
      "",
      "الصفحة فُتحت باسمكم:",
      link,
      "",
      "إذا ناسبكم الاتجاه، نحدد نطاق المرحلة الأولى في مكالمة قصيرة.",
      "",
      "مهندس FlowFi",
      "+965 9737 8148",
      "weflowfi.com"
    ].join("\n");
    const en = [
      "Team at " + name + ",",
      "",
      "I am the systems architect at FlowFi, from Kuwait. I looked at your " + niche.en.toLowerCase() + " path. The point worth building now is " + pain.en + ".",
      "",
      "I prepared a specific path, not a generic offer:",
      pain.offer.en,
      "",
      "The page opens in your name:",
      link,
      "",
      "If the direction fits, we set the scope of phase one on a short call.",
      "",
      "FlowFi architect",
      "+965 9737 8148",
      "weflowfi.com"
    ].join("\n");
    return { ar, en };
  }

  function readSnipes() {
    try {
      const parsed = JSON.parse(localStorage.getItem(SNIPES));
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      return [];
    }
  }

  function renderSnipes() {
    const root = $("sniperList");
    if (!root) return;
    const items = readSnipes();
    if (!items.length) {
      root.innerHTML = "";
      return;
    }
    root.innerHTML = items.slice(0, 8).map((item) => {
      return '<article class="lead"><div class="lead-top"><div class="lead-main"><strong>' + esc(item.name) + '</strong><span class="soft">' + esc(item.nicheLabel || "") + " · " + esc(item.painLabel || "") + "</span></div>"
        + '<button type="button" class="btn btn-line btn-sm" data-open-snipe="' + esc(item.id) + '">' + esc(say("فتح", "Open")) + "</button></div></article>";
    }).join("");
  }

  function renderSnipe() {
    const root = $("sniperOut");
    if (!root || !snipe) return;
    const text = snipe.message[lang()];
    root.innerHTML = '<article class="sniper-card">'
      + '<p class="eyebrow">VIP</p>'
      + "<h3>" + esc(snipe.name) + "</h3>"
      + '<label class="field"><span>' + esc(say("الرسالة", "Message")) + " · " + esc(lang() === "ar" ? "العربية" : "English") + '</span><textarea id="snipeText" readonly>' + esc(text) + "</textarea></label>"
      + '<label class="field"><span>' + esc(say("الرسالة الأخرى", "The other language")) + '</span><textarea id="snipeTextAlt" readonly>' + esc(snipe.message[lang() === "ar" ? "en" : "ar"]) + "</textarea></label>"
      + '<label class="field"><span>' + esc(say("رابط العرض", "Proposal link")) + '</span><input id="snipeLink" readonly dir="ltr" value="' + esc(snipe.link) + '"></label>'
      + '<div class="copy-row">'
      + '<button type="button" class="btn btn-gold btn-sm" data-copy="snipeText">' + esc(say("نسخ الرسالة", "Copy message")) + "</button>"
      + '<button type="button" class="btn btn-line btn-sm" data-copy="snipeLink">' + esc(say("نسخ الرابط", "Copy link")) + "</button>"
      + '<a class="btn btn-line btn-sm" id="snipeWa" target="_blank" rel="noopener noreferrer">' + esc(say("فتح واتساب بالرسالة", "Open WhatsApp with the message")) + "</a>"
      + '<a class="btn btn-line btn-sm" id="snipeMail">' + esc(say("فتح البريد", "Open email")) + "</a>"
      + "</div></article>";
    const wa = $("snipeWa");
    const mail = $("snipeMail");
    if (wa) wa.href = "https://wa.me/?text=" + encodeURIComponent(snipe.message.ar);
    if (mail) mail.href = "mailto:?subject=" + encodeURIComponent("FlowFi · " + snipe.name) + "&body=" + encodeURIComponent(snipe.message[lang()]);
  }

  function generateSnipe(event) {
    event.preventDefault();
    const name = clean($("snipeName").value, 80);
    const nicheKey = $("snipeNiche").value;
    const painKey = $("snipePain").value;
    if (name.length < 2 || !NICHES[nicheKey] || !PAIN[painKey]) {
      if (window.FlowFiRoom) window.FlowFiRoom.toast(say("اكتب اسم الشركة.", "Add the company name."));
      return;
    }
    const link = vipLink(name, nicheKey, painKey);
    const niche = nicheOf(nicheKey);
    const pain = PAIN[painKey];
    snipe = { name, nicheKey, painKey, link, message: snipeMessage(name, nicheKey, painKey, link) };
    const record = {
      id: "VIP-" + Date.now().toString(36).toUpperCase(),
      name,
      nicheKey,
      painKey,
      nicheLabel: niche.ar,
      painLabel: pain.ar,
      link,
      message: snipe.message,
      createdAt: new Date().toISOString()
    };
    const list = readSnipes().filter((item) => item.name !== name || item.nicheKey !== nicheKey);
    list.unshift(record);
    localStorage.setItem(SNIPES, JSON.stringify(list.slice(0, 30)));
    renderSnipe();
    renderSnipes();
  }

  function openSnipe(id) {
    const item = readSnipes().find((entry) => entry.id === id);
    if (!item) return;
    snipe = item;
    if ($("snipeName")) $("snipeName").value = item.name;
    if ($("snipeNiche")) $("snipeNiche").value = item.nicheKey;
    if ($("snipePain")) $("snipePain").value = item.painKey;
    renderSnipe();
  }

  async function copyField(id) {
    const node = $(id);
    const value = node ? (node.value || node.textContent || "") : "";
    try {
      if (navigator.clipboard) await navigator.clipboard.writeText(value);
      else {
        node.focus();
        node.select();
        document.execCommand("copy");
      }
      if (window.FlowFiRoom) window.FlowFiRoom.toast(say("نُسخ.", "Copied."));
    } catch (err) {
      if (window.FlowFiRoom) window.FlowFiRoom.toast(say("تعذر النسخ. حدد النص يدوياً.", "Copy failed. Select the text."));
    }
  }

  function bind() {
    const form = $("xrayForm");
    if (form) form.addEventListener("submit", analyze);
    document.addEventListener("click", (event) => {
      if (event.target.closest("#xrayAdopt")) adopt();
      const copy = event.target.closest("[data-copy]");
      if (copy) copyField(copy.dataset.copy);
      const saved = event.target.closest("[data-open-snipe]");
      if (saved) openSnipe(saved.dataset.openSnipe);
    });
    const sniper = $("sniperForm");
    if (sniper) sniper.addEventListener("submit", generateSnipe);
  }

  window.FlowFiAcquire = {
    refresh: function () {
      renderVip();
      renderReport();
      renderSnipe();
      renderSnipes();
    }
  };

  readVip();
  bind();
  applyVipForm();
  renderVip();
  renderSnipes();
})();
