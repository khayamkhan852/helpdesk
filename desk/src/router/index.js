import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";

export const WEBSITE_ROOT = "Website Root";

export const LOGIN = "AuthLogin";
export const SIGNUP = "AuthSignup";
export const VERIFY = "AuthVerify";
export const AUTH_ROUTES = [LOGIN, SIGNUP, VERIFY];
export const ONBOARDING_PAGE = "Setup";

export const CUSTOMER_PORTAL_NEW_TICKET = "TicketNew";
export const CUSTOMER_PORTAL_TICKET = "TicketCustomer";

export const AGENT_PORTAL_AGENT_LIST = "AgentList";
export const AGENT_PORTAL_CONTACT_LIST = "ContactList";
export const AGENT_PORTAL_CUSTOMER_LIST = "CustomerList";
export const AGENT_PORTAL_ESCALATION_RULE_LIST = "EscalationRules";
export const AGENT_PORTAL_TEAM_LIST = "Teams";
export const AGENT_PORTAL_TEAM_SINGLE = "Team";
export const AGENT_PORTAL_TICKET = "TicketAgent";
export const AGENT_PORTAL_TICKET_LIST = "TicketsAgent";
export const AGENT_PORTAL_KNOWLEDGE_BASE = "DeskKBHome";
export const AGENT_PORTAL_KNOWLEDGE_BASE_CATEGORY = "DeskKBCategory";
export const AGENT_PORTAL_KNOWLEDGE_BASE_SUB_CATEGORY = "DeskKBSubcategory";
export const AGENT_PORTAL_KNOWLEDGE_BASE_ARTICLE = "DeskKBArticle";

export const KB_PUBLIC = "KBHome";
export const KB_PUBLIC_ARTICLE = "KBArticlePublic";
export const KB_PUBLIC_CATEGORY = "KBCategoryPublic";

export const CUSTOMER_PORTAL_LANDING = "TicketsCustomer";
export const AGENT_PORTAL_LANDING = AGENT_PORTAL_TICKET_LIST;

const routes = [
  {
    path: "",
    component: () => import("@/pages/HRoot.vue"),
  },
  {
    path: "/knowledge-base",
    component: () => import("@/pages/KnowledgeBasePublic.vue"),
    children: [
      {
        path: "",
        name: "KBHome",
        component: () => import("@/pages/KnowledgeBasePublicHome.vue"),
      },
      {
        path: ":categoryId",
        name: "KBCategoryPublic",
        component: () => import("@/pages/KnowledgeBasePublicCategory.vue"),
        props: true,
      },
      {
        path: "articles/:articleId",
        name: "KBArticlePublic",
        component: () => import("@/pages/KnowledgeBaseArticle.vue"),
        meta: {
          public: true,
        },
        props: true,
      },
    ],
  },
  {
    path: "/my-tickets",
    component: () => import("@/pages/CLayout.vue"),
    meta: {
      auth: true,
    },
    children: [
      {
        path: "",
        name: "TicketsCustomer",
        component: () => import("@/pages/TicketsCustomer.vue"),
      },
      {
        path: "new/:templateId?",
        name: "TicketNew",
        component: () => import("@/pages/TicketNew.vue"),
        props: true,
        meta: {
          onSuccessRoute: "TicketCustomer",
          parent: "TicketsCustomer",
        },
      },
      {
        path: ":ticketId",
        name: "TicketCustomer",
        component: () => import("@/pages/TicketCustomer.vue"),
        props: true,
      },
    ],
  },
  {
    path: "",
    meta: {
      auth: false,
    },
    children: [
      {
        path: "/login",
        name: "AuthLogin",
        component: () => import("@/pages/AuthLogin.vue"),
      },
      {
        path: "/signup",
        name: "AuthSignup",
        component: () => import("@/pages/AuthSignup.vue"),
      },
      {
        path: "/verify/:requestKey",
        name: "AuthVerify",
        component: () => import("@/pages/AuthVerify.vue"),
        props: true,
      },
    ],
  },
  {
    path: "/onboarding",
    name: ONBOARDING_PAGE,
    component: () => import("@/pages/onboarding/SimpleOnboarding.vue"),
  },
  {
    path: "/:invalidpath",
    name: "Invalid Page",
    component: () => import("@/pages/InvalidPage.vue"),
  },
  {
    path: "",
    name: "AgentRoot",
    component: () => import("@/pages/desk/AgentRoot.vue"),
    meta: {
      auth: true,
      agent: true,
      admin: false,
    },
    children: [
      {
        path: "tickets",
        name: AGENT_PORTAL_TICKET_LIST,
        component: () => import("@/pages/TicketsAgent.vue"),
      },
      {
        path: "tickets/new/:templateId?",
        name: "TicketAgentNew",
        component: () => import("@/pages/TicketNew.vue"),
        props: true,
        meta: {
          onSuccessRoute: "TicketAgent",
          parent: "TicketsAgent",
        },
      },
      {
        path: "tickets/:ticketId",
        name: "TicketAgent",
        component: () => import("@/pages/TicketAgent.vue"),
        props: true,
      },
      {
        path: "kb",
        name: AGENT_PORTAL_KNOWLEDGE_BASE,
        component: () => import("@/pages/knowledge-base/KnowledgeBase.vue"),
        children: [
          {
            path: ":categoryId",
            name: AGENT_PORTAL_KNOWLEDGE_BASE_CATEGORY,
            props: true,
            component: () =>
              import("@/pages/knowledge-base/KnowledgeBaseCategory.vue"),
          },
          {
            path: ":categoryId/:subCategoryId",
            name: AGENT_PORTAL_KNOWLEDGE_BASE_SUB_CATEGORY,
            props: true,
            component: () =>
              import("@/pages/knowledge-base/KnowledgeBaseSubcategory.vue"),
          },
        ],
      },
      {
        path: "kb/articles/:articleId",
        name: AGENT_PORTAL_KNOWLEDGE_BASE_ARTICLE,
        props: true,
        component: () => import("@/pages/KnowledgeBaseArticle.vue"),
      },
      {
        path: "customers",
        name: AGENT_PORTAL_CUSTOMER_LIST,
        component: () => import("@/pages/desk/customer/CustomerList.vue"),
      },
      {
        path: "contacts",
        name: AGENT_PORTAL_CONTACT_LIST,
        component: () => import("@/pages/desk/contact/ContactList.vue"),
      },
      {
        path: "agents",
        name: AGENT_PORTAL_AGENT_LIST,
        component: () => import("@/pages/desk/agent/AgentList.vue"),
      },
      {
        path: "teams",
        name: AGENT_PORTAL_TEAM_LIST,
        component: () => import("@/pages/desk/team/TeamList.vue"),
      },
      {
        path: "teams/:teamId",
        name: AGENT_PORTAL_TEAM_SINGLE,
        component: () => import("@/pages/desk/team/TeamSingle.vue"),
        props: true,
      },
      {
        path: "canned-responses",
        name: "CannedResponses",
        component: () => import("@/pages/CannedResponses.vue"),
      },
      {
        path: "escalation-rules",
        name: AGENT_PORTAL_ESCALATION_RULE_LIST,
        component: () =>
          import("@/pages/desk/escalation/EscalationRuleList.vue"),
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory("/helpdesk/"),
  routes,
});

router.beforeEach(async (to) => {
  const isAuthRoute = AUTH_ROUTES.includes(to.name);
  const authStore = useAuthStore();
  const usersStore = useUserStore();

  try {
    await authStore.init();
    await usersStore.init();

    if (isAuthRoute && authStore.isLoggedIn) {
      if (authStore.isAgent) {
        router.replace({ name: AGENT_PORTAL_LANDING });
      } else {
        router.replace({ name: CUSTOMER_PORTAL_LANDING });
      }
    } else if (!isAuthRoute && !authStore.isLoggedIn) {
      router.replace({ name: "Login" });
    } else if (to.matched.length === 0) {
      router.replace({ name: "Invalid Page" });
    }
  } catch {
    if (!isAuthRoute) {
      router.replace({
        name: LOGIN,
        query: {
          redirect: to.path.toString(),
        },
      });
    }
  }
});
