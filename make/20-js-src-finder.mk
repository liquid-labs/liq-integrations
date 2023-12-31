# This file was generated by @liquid-labs/catalyst-builder-workflow-local-make-
# node. Refer to https://npmjs.com/package/@liquid-labs/catalyst-builder-workflow-
# local-make-node for further details

CATALYST_JS_SELECTOR=\( -name "*.js" -o -name "*.cjs" -o -name "*.mjs" \)
CATALYST_TEST_SELECTOR=\( -name "*.test.*js" -o -path "*/test/*" \)

# all source, non-test files (cli and lib)
CATALYST_ALL_JS_FILES_SRC:=$(shell find $(SRC) $(CATALYST_JS_SELECTOR) -not $(CATALYST_DATA_SELECTOR) -type f)
CATALYST_ALL_NON_TEST_JS_FILES_SRC:=$(shell find $(SRC) $(CATALYST_JS_SELECTOR) -not $(CATALYST_DATA_SELECTOR) -not $(CATALYST_TEST_SELECTOR) -type f)
CATALYST_JS_TEST_FILES_BUILT:=$(patsubst %.cjs, %.js, $(patsubst %.mjs, %.js, $(patsubst $(SRC)/%, test-staging/%, $(CATALYST_ALL_JS_FILES_SRC))))
