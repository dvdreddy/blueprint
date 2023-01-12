"use strict";
/*
 * (c) Copyright 2022 Palantir Technologies Inc. All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNoDeprecatedComponentsRule = void 0;
// tslint:disable object-literal-sort-keys
const utils_1 = require("@typescript-eslint/utils");
const createRule_1 = require("../utils/createRule");
/**
 * Higher-order function to create an ESLint rule which checks for usage of deprecated React components in JSX syntax.
 *
 * @param packagesToCheck Only components imported from these packages will be flagged.
 *
 * @param deprecatedComponentConfig Configuration of the deprecated components to lint for. Note that this configuration
 *  is not exposed to lint rule users, it just lives inside our rule implementations. Lint violations will include a
 *  recommendation to migrate to the newer, non-deprecated component specified in this mapping. Keys-value pairs may use
 *  one of two syntaxes:
 *      - "ComponentV1": "ComponentV2" - Usage of <ComponentV1> will be flagged with a recommendation
 *          to migrate to <ComponentV2>
 *      - "ComponentV1.propName": "ComponentV2" - Usage of <ComponentV1 propName={...}> will be flagged with a
 *          recommendation to migrate to <ComponentV2>
 */
function createNoDeprecatedComponentsRule(ruleName, packagesToCheck, deprecatedComponentConfig) {
    const descriptionFromClause = packagesToCheck.length === 1 ? ` from ${packagesToCheck[0]}` : "";
    return (0, createRule_1.createRule)({
        name: ruleName,
        meta: {
            type: "suggestion",
            docs: {
                description: `Reports on usage of deprecated Blueprint components${descriptionFromClause} and recommends migrating to their corresponding non-deprecated API alternatives.`,
                requiresTypeChecking: false,
                recommended: "error",
            },
            messages: {
                migration: "Usage of {{ deprecatedComponentName }} is deprecated, migrate to {{ newComponentName }} instead",
                migrationWithPropUsage: "Usage of {{ deprecatedComponentName }} with prop '{{ deprecatedPropName }}' is deprecated, migrate to {{ newComponentName }} instead",
            },
            schema: [
                {
                    enum: ["migration", "migrationWithPropUsage"],
                },
            ],
        },
        defaultOptions: [],
        create: context => {
            const deprecatedImports = [];
            // parses out additional deprecated components from entries like { "MenuItem.popoverProps": "MenuItem2" }
            const additionalDeprecatedComponents = Object.keys(deprecatedComponentConfig).reduce((components, key) => {
                const [componentName, propName] = key.split(".");
                if (propName !== undefined) {
                    components.push(componentName);
                }
                return components;
            }, []);
            function isDeprecatedComponent(name) {
                return (deprecatedComponentConfig[name] != null &&
                    deprecatedImports.some(deprecatedImport => deprecatedImport.type === "function" && deprecatedImport.localFunctionName === name));
            }
            function isDeprecatedNamespacedComponent(name, property) {
                return (deprecatedComponentConfig[property] != null &&
                    deprecatedImports.some(deprecatedImport => deprecatedImport.type === "namespace" && deprecatedImport.namespace === name));
            }
            function checkDeprecatedComponentAndProp(jsxOpeningElementChildNode, elementName, openingElementNode) {
                const deprecatedProp = openingElementNode.attributes.find(attribute => attribute.type === utils_1.TSESTree.AST_NODE_TYPES.JSXAttribute &&
                    attribute.name.type === utils_1.TSESTree.AST_NODE_TYPES.JSXIdentifier &&
                    deprecatedComponentConfig[`${elementName}.${attribute.name.name}`] != null);
                if (deprecatedProp === undefined) {
                    return;
                }
                const deprecatedComponentKey = Object.keys(deprecatedComponentConfig).find(key => key.includes(".") && key.split(".")[0] === elementName);
                const deprecatedPropName = deprecatedProp.name
                    .name;
                context.report({
                    data: {
                        deprecatedComponentName: elementName,
                        deprecatedPropName,
                        newComponentName: deprecatedComponentConfig[deprecatedComponentKey],
                    },
                    messageId: "migrationWithPropUsage",
                    node: jsxOpeningElementChildNode,
                });
            }
            // Get the list of all deprecated imports from packages included in the provided list
            return {
                "Program > ImportDeclaration": (node) => {
                    if (!packagesToCheck.includes(node.source.value)) {
                        return;
                    }
                    for (const importClause of node.specifiers) {
                        switch (importClause.type) {
                            case utils_1.TSESTree.AST_NODE_TYPES.ImportDefaultSpecifier:
                            case utils_1.TSESTree.AST_NODE_TYPES.ImportNamespaceSpecifier:
                                deprecatedImports.push({
                                    namespace: importClause.local.name,
                                    type: "namespace",
                                });
                                break;
                            case utils_1.TSESTree.AST_NODE_TYPES.ImportSpecifier:
                                if (deprecatedComponentConfig[importClause.imported.name] != null ||
                                    additionalDeprecatedComponents.includes(importClause.imported.name)) {
                                    deprecatedImports.push({
                                        functionName: importClause.imported.name,
                                        localFunctionName: importClause.local.name,
                                        type: "function",
                                    });
                                }
                                break;
                        }
                    }
                },
                // check <DeprecatedComponent> syntax (includes self-closing tags)
                "JSXElement > JSXOpeningElement > JSXIdentifier": (node) => {
                    if (isDeprecatedComponent(node.name)) {
                        context.report({
                            data: {
                                deprecatedComponentName: node.name,
                                newComponentName: deprecatedComponentConfig[node.name],
                            },
                            messageId: "migration",
                            node,
                        });
                    }
                    else if (isOpeningElement(node.parent)) {
                        // check <DeprecatedComponent withDeprecatedProp={...}> syntax
                        checkDeprecatedComponentAndProp(node, node.name, node.parent);
                    }
                },
                // check <Blueprint.DeprecatedComponent> syntax (includes self-closing tags)
                "JSXElement > JSXOpeningElement > JSXMemberExpression[property.type='JSXIdentifier']": (node) => {
                    if (node.object.type !== utils_1.TSESTree.AST_NODE_TYPES.JSXIdentifier ||
                        node.property.type !== utils_1.TSESTree.AST_NODE_TYPES.JSXIdentifier) {
                        return;
                    }
                    const namespaceIdentifier = node.object;
                    if (isDeprecatedNamespacedComponent(namespaceIdentifier.name, node.property.name)) {
                        // Uses a blueprint namespace and a deprecated property
                        context.report({
                            data: {
                                deprecatedComponentName: node.property.name,
                                newComponentName: deprecatedComponentConfig[node.property.name],
                            },
                            messageId: "migration",
                            node: node.property,
                        });
                    }
                    else if (isOpeningElement(node.parent)) {
                        // check <Blueprint.DeprecatedComponent withDeprecatedProp={...}> syntax
                        checkDeprecatedComponentAndProp(node, node.property.name, node.parent);
                    }
                },
                // check `class Foo extends DeprecatedComponent` syntax
                "ClassDeclaration[superClass.type='Identifier']": (node) => {
                    const superClass = node.superClass;
                    if (isDeprecatedComponent(superClass.name)) {
                        context.report({
                            data: {
                                deprecatedComponentName: superClass.name,
                                newComponentName: deprecatedComponentConfig[superClass.name],
                            },
                            messageId: "migration",
                            node,
                        });
                    }
                },
                // check `class Foo extends Blueprint.DeprecatedComponent` syntax
                "ClassDeclaration[superClass.type='MemberExpression']": (node) => {
                    const superClass = node.superClass;
                    if (superClass.property.type !== utils_1.TSESTree.AST_NODE_TYPES.Identifier ||
                        superClass.object.type !== utils_1.TSESTree.AST_NODE_TYPES.Identifier) {
                        return;
                    }
                    const namespaceIdentifier = superClass.object;
                    if (isDeprecatedNamespacedComponent(namespaceIdentifier.name, superClass.property.name)) {
                        // Uses a blueprint namespace and a deprecated property
                        context.report({
                            data: {
                                deprecatedComponentName: superClass.property.name,
                                newComponentName: deprecatedComponentConfig[superClass.property.name],
                            },
                            messageId: "migration",
                            node: superClass.property,
                        });
                    }
                },
                // check `MultiSelect.ofType<T>()` syntax
                "MemberExpression[object.type='Identifier']": (node) => {
                    if (node.object.type !== utils_1.TSESTree.AST_NODE_TYPES.Identifier) {
                        return;
                    }
                    if (isDeprecatedComponent(node.object.name)) {
                        const deprecatedComponentName = node.object.name;
                        context.report({
                            data: {
                                deprecatedComponentName,
                                newComponentName: deprecatedComponentConfig[deprecatedComponentName],
                            },
                            messageId: "migration",
                            node: node.object,
                        });
                    }
                },
            };
        },
    });
}
exports.createNoDeprecatedComponentsRule = createNoDeprecatedComponentsRule;
function isOpeningElement(parent) {
    return (parent === null || parent === void 0 ? void 0 : parent.type) === utils_1.TSESTree.AST_NODE_TYPES.JSXOpeningElement;
}
//# sourceMappingURL=createNoDeprecatedComponentsRule.js.map